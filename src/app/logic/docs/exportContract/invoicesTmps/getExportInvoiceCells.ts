import exportContractStore from '../../../../stores/docsStores/exportContractStore';
import {
    CellObjDoubleT as CellDoubleT,
    CellObjT as CellSingleT,
} from '../../../../types/typesExcelUtils';
import { getExcelDateStr } from '../../../excel/utils/getExcelDate';
import { InvoiceT } from '../groupBy/initInvoice';

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
        bankSeller,
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
    const doubleObj = {
        common: <CellDoubleT[]>[
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
                cell: 'Инвойс_продавец_адрес',
                eng: `${seller.eng.address}`,
                ru: `${seller.ru.address}`,
            },
            {
                cell: 'Инвойс_покупатель',
                eng: `${agent.name}`,
                ru: `${agent.name}`,
            },
            {
                cell: 'Инвойс_покупатель_адрес',
                eng: `${agent.address}`,
                ru: `${agent.address}`,
            },
            {
                cell: 'Инвойс_получатель',
                eng: `${consignee.fullName}`,
                ru: `${consignee.fullName}`,
            },
            {
                cell: 'Инвойс_получатель_адрес',
                eng: `${consignee.addres}`,
                ru: `${consignee.addres}`,
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
                cell: 'Инвойс_условия',
                eng: `${terms}, ${portTo.eng.name}`,
                ru: `${terms}, ${portTo.ru.name}`,
            },
        ],
        exportDefault: <CellDoubleT[]>[
            {
                cell: 'Инвойс',
                eng: `Commercial invoice № ${invoiceNo} dated ${date.invoice('eng')}`,
                ru: `Коммерческий инвойс № ${invoiceNo} от ${date.invoice('ru')}`,
            },
            {
                cell: 'Инвойс_соглашение',
                eng: `to the Agreement No. ${agreementNo} from ${date.agreement('eng')}`,
                ru: `к Дополнению No. ${agreementNo} от ${date.agreement('ru')}`,
            },
            {
                cell: 'Инвойс_декларация',
                eng: exportContractStore.fields.declaration,
                ru: exportContractStore.fields.declaration,
                isEmptyTitle: exportContractStore.currentTerms === 'CFR',
            },
        ],
        exportFCA: <CellDoubleT[]>[
            {
                cell: 'Инвойс_откуда',
                eng: '-',
                ru: '-',
            },
        ],
        exportStorage: <CellDoubleT[]>[
            {
                cell: 'Инвойс',
                eng: `Non-commercial invoice № ${invoiceNo} dated ${date.invoice('eng')}`,
                ru: `Некоммерческий инвойс № ${invoiceNo} от ${date.invoice('ru')}`,
            },
            {
                cell: 'Инвойс_соглашение',
                eng: `to the Storage Agreement No. ${agreementNo} from ${date.agreement('eng')}`,
                ru: `к Дополнительному соглашению No. ${agreementNo} от ${date.agreement('ru')}`,
            },
        ],
    };

    const singleObj = {
        common: <CellSingleT[]>[
            {
                cell: 'Инвойс_подписант',
                value: `Signed by ${exportContractStore.fields.podpisant.eng.name} / Подписано ${exportContractStore.fields.podpisant.ru.name}`,
            },
        ],
        exportDefault: <CellSingleT[]>[
            {
                cell: 'Инвойс_банк_получателя',
                value: `Beneficiary Bank: ${bankSeller.eng.name}`,
            },
            {
                cell: 'Инвойс_банк_получателя_адрес',
                value: `Bank address: ${bankSeller.address}`,
            },
            {
                cell: 'Инвойс_банк_получателя_свифт',
                value: `SWIFT: ${bankSeller.swift}`,
            },
            {
                cell: 'Инвойс_получатель_в_пользу',
                value: `in forward to ${seller.eng.name}`,
            },
            {
                cell: 'Инвойс_получатель_счет',
                value: `A/C: ${bankSeller.accountNo}`,
            },
        ],
    };

    const singleCells = [...singleObj.common];
    const doubleCells = [...doubleObj.common];

    if (invoice.record.type === 'export') {
        singleCells.push(...singleObj.exportDefault);
        doubleCells.push(...doubleObj.exportDefault);

        if (terms === 'FCA') {
            doubleCells.push(...doubleObj.exportFCA);
        }
    }
    if (invoice.record.type === 'exportStorage') {
        doubleCells.push(...doubleObj.exportStorage);
    }

    return { double: doubleCells, single: singleCells };
};
