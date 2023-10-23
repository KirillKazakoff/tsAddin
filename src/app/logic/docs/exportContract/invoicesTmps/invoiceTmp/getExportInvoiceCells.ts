import exportContractStore from '../../../../../stores/docsStores/exportContractStore';
import { CellObjDoubleT as CellObjT } from '../../../../../types/typesExcelUtils';
import { getExcelDateStr } from '../../../../excel/utils/getExcelDate';
import { InvoiceT } from '../../groupBy/initInvoice';

export const getExportInvoiceCells = (invoice: InvoiceT) => {
    const {
        seller,
        transport,
        portFrom,
        portTo,
        agreementNo,
        agent,
        contract,
        date: agreementDate,
        vessel,
        terms,
    } = invoice.agreement.record;
    const {
        invoiceDate, invoiceNo, msc, consignee,
    } = invoice;
    const date = {
        agreement: (locale: string) => getExcelDateStr(agreementDate, locale),
        invoice: (language: string) => getExcelDateStr(invoiceDate, language),
        contract: (language: string) => getExcelDateStr(contract.date, language),
    };

    // prettier-ignore
    const cells = {
        common: <CellObjT[]>[
            {
                cell: 'Инвойс',
                eng: `Non-commercial invoice № ${invoiceNo} dated ${date.invoice('eng')}`,
                ru: `Некоммерческий инвойс № ${invoiceNo} от ${date.invoice('ru')}`,
            },
            {
                cell: 'Инвойс_контракт',
                eng: `to the Contract of sale № ${contract.contractNo}`,
                ru: `к контракту купли-продажи № ${contract.contractNo}`,
            },
            {
                cell: 'Инвойс_дата',
                eng: `Magadan, ${date.contract('eng')}`,
                ru: `Магадан, от ${date.contract('ru')}`,
            },
            {
                cell: 'Инвойс_продавец',
                eng: `${seller.eng.name}`,
                ru: `${seller.ru.name}`,
            },
            {
                cell: 'Инвойс_покупатель',
                eng: `${agent.name}`,
                ru: `${agent.name}`,
            },
            {
                cell: 'Инвойс_покупатель_адрес',
                eng: `${consignee.fullName}`,
                ru: `${consignee.fullName}`,
            },
            {
                cell: 'Инвойс_транспорт',
                eng: `${transport.eng.name}`,
                ru: `${transport.ru.name}`,
            },
            {
                cell: 'Инвойс_куда',
                eng: `${portTo.eng.name}, ${portTo.eng.country}`,
                ru: `${portTo.ru.name}, ${portTo.ru.country}`,
            },
            {
                cell: 'Инвойс_откуда',
                eng: `${portFrom?.eng?.name}`,
                ru: `${portFrom?.ru?.name}`,
            },
            {
                cell: 'Инвойс_изготовитель',
                eng: `${vessel.eng.name}`,
                ru: `${vessel.ru.name}`,
            },
            {
                cell: 'Инвойс_МСЦ',
                eng: msc ? 'MSC-C-52870' : 'Non-MSC product',
                ru: msc ? 'MSC-C-52870' : 'Non-MSC product',
            },
            {
                cell: 'Инвойс_подписант',
                eng: `Signed by ${exportContractStore.fields.podpisant.eng.name}`,
                ru: `Подписано ${exportContractStore.fields.podpisant.ru.name}`,
            },
            {
                cell: 'Инвойс_условия',
                eng: `${terms}, ${portTo.eng.name}`,
                ru: `${terms}, ${portTo.ru.name}`,
            },
        ],
        exportDefault: <CellObjT[]>[
            {
                cell: 'Инвойс_соглашение',
                eng: `to the Agreement No. ${agreementNo} from ${date.agreement('eng')}`,
                ru: `к Дополнению No. ${agreementNo} от ${date.agreement('ru')}`,
            },
            {
                cell: 'Инвойс_декларация',
                eng: exportContractStore.fields.declaration,
                ru: exportContractStore.fields.declaration,
            },
        ],
        exportFCA: <CellObjT[]>[
            {
                cell: 'Инвойс_откуда',
                eng: '',
                ru: '',
            },
        ],
        exportStorage: <CellObjT[]>[
            {
                cell: 'Инвойс_соглашение',
                eng: `to the Storage Agreement No. ${agreementNo} from ${date.agreement('eng')}`,
                ru: `к Дополнительному соглашению No. ${agreementNo} от ${date.agreement('ru')}`,
            },
        ],
    };

    const resArr = [...cells.common];

    if (invoice.record.type === 'export') {
        resArr.push(...cells.exportDefault);

        if (terms === 'FCA') {
            resArr.push(...cells.exportFCA);
        }
    }
    if (invoice.record.type === 'exportStorage') {
        resArr.push(...cells.exportStorage);
    }

    return resArr;
};
