import exportContractStore from '../../../../stores/docsStores/exportContractStore';
import {
    CellDeclarationT,
    CellObjDoubleT as CellObjT,
    CellSettingsCommonT,
} from '../../../../types/typesExcelUtils';
import { getExcelDateStr } from '../../../excel/utils/getExcelDate';
import { ExportGroupT } from '../groupAgByNo';

export const getExportInvoiceCells = (invoice: ExportGroupT) => {
    const {
        seller,
        transport,
        portFrom,
        portTo,
        agreementNo,
        contract,
        date: docDate,
        terms,
        bankSeller,
        invoice: invoiceNo,
        msc,
        consignee,
        agent,
        vessel,
        declarationNo,
        type,
    } = invoice.record;

    const date = {
        agreement: (locale: string) => getExcelDateStr(docDate, locale),
        invoice: (language: string) => getExcelDateStr(docDate, language),
        contract: (language: string) => getExcelDateStr(contract.date, language),
    };
    const { podpisant } = exportContractStore.fields;

    const commonObj = {
        common: [
            {
                name: 'Инвойс_подписант',
                eng: `Signed by ${podpisant.eng.name} / ${podpisant.ru.name}`,
            },
            {
                name: 'Инвойс_дата',
                eng: `Magadan, ${date.contract('eng')}`,
                ru: `Магадан, от ${date.contract('ru')}`,
            },
            {
                name: 'Инвойс_продавец',
                eng: `${seller.eng.name}`,
                ru: `${seller.ru.fullNameOrg}`,
            },
            {
                name: 'Инвойс_продавец_адрес',
                eng: `${seller.eng.address}`,
                ru: `${seller.ru.address}`,
            },
            {
                name: 'Инвойс_покупатель',
                eng: `${agent.name}`,
                ru: `${agent.name}`,
            },
            {
                name: 'Инвойс_покупатель_адрес',
                eng: `${agent.address}`,
                ru: `${agent.address}`,
            },
            {
                name: 'Инвойс_получатель',
                eng: `${consignee.fullName}`,
                ru: `${consignee.fullName}`,
            },
            {
                name: 'Инвойс_получатель_адрес',
                eng: `${consignee.addres}`,
                ru: `${consignee.addres}`,
            },
            {
                name: 'Инвойс_транспорт',
                eng: `${transport.eng.name}`,
                ru: `${transport.ru.name}`,
            },
            {
                name: 'Инвойс_куда',
                eng: `${portTo.eng.name}, ${portTo.eng.country}`,
                ru: `${portTo.ru.name}, ${portTo.ru.country}`,
            },
            {
                name: 'Инвойс_откуда',
                eng: `${portFrom?.eng?.name}`,
                ru: `${portFrom?.ru?.name}`,
            },
            {
                name: 'Инвойс_изготовитель',
                eng: `${vessel.eng.name}`,
                ru: `${vessel.ru.name}`,
            },
            {
                name: 'Инвойс_МСЦ',
                eng: msc ? 'MSC-C-52870' : 'Non-MSC product',
                ru: msc ? 'MSC-C-52870' : 'Non-MSC product',
            },
            {
                name: 'Инвойс_условия',
                eng: `${terms}, ${portTo.eng.name}`,
                ru: `${terms}, ${portTo.ru.name}`,
            },
        ],
        export: [
            {
                name: 'Инвойс_банк_получателя',
                eng: `Beneficiary Bank: ${bankSeller.eng.name}`,
            },
            {
                name: 'Инвойс_банк_получателя_адрес',
                eng: `Bank address: ${bankSeller.address}`,
            },
            {
                name: 'Инвойс_банк_получателя_свифт',
                eng: `SWIFT: ${bankSeller.swift}`,
            },
            {
                name: 'Инвойс_получатель_в_пользу',
                eng: `in forward to ${seller.eng.name}`,
            },
            {
                name: 'Инвойс_получатель_счет',
                eng: `A/C: ${bankSeller.accountNo}`,
            },
        ],
        EXWCFR: [
            {
                name: 'Инвойс',
                eng: `Commercial invoice № ${invoiceNo} dated ${date.invoice('eng')}`,
                ru: `Коммерческий инвойс № ${invoiceNo} от ${date.invoice('ru')}`,
            },
            {
                name: 'Инвойс_соглашение',
                eng: `to the Agreement No. ${agreementNo} from ${date.agreement('eng')}`,
                ru: `к Дополнению No. ${agreementNo} от ${date.agreement('ru')}`,
            },
            {
                name: 'Инвойс_контракт',
                eng: `to the Contract of sale № ${contract.contractNo}`,
                ru: `к контракту купли-продажи № ${contract.contractNo}`,
            },
        ],
        FCA: [
            {
                name: 'Инвойс_контракт',
                eng: `to the Contract of sale № ${contract.contractNo}`,
                ru: `к контракту купли-продажи № ${contract.contractNo}`,
            },
            {
                name: 'Инвойс_соглашение',
                eng: `to the Agreement No. ${agreementNo} from ${date.agreement('eng')}`,
                ru: `к Дополнению No. ${agreementNo} от ${date.agreement('ru')}`,
            },
            {
                name: 'Инвойс_транспорт',
                eng: `${portTo.eng.name}, ${portTo.eng.country}`,
                ru: `${portTo.ru.name}, ${portTo.ru.country}`,
                redefineCell: {
                    offset: { x: 0, y: -1 },
                    cell: { value: 'To' },
                    cellRu: { value: 'Порт назначения' },
                },
            },
            {
                name: 'Инвойс_куда',
                eng: `${terms}, ${portTo.eng.name}`,
                ru: `${terms}, ${portTo.ru.name}`,
                redefineCell: {
                    offset: { x: 0, y: -1 },
                    cell: { value: 'Terms of delivery and payment' },
                    cellRu: { value: 'Условия доставки и оплаты' },
                },
            },
            {
                name: 'Инвойс_откуда',
                eng: null,
                ru: null,
                redefineCell: { offset: { x: 0, y: -1 }, cell: { value: null } },
            },
            {
                name: 'Инвойс_декларация',
                eng: null,
                ru: null,
                redefineCell: { offset: { x: 0, y: -1 }, cell: { value: null } },
            },
        ],
    } satisfies CellDeclarationT<CellObjT>;

    // prettier-ignore
    const cellsObj = {
        common: commonObj.common,
        cfr: [
            {
                name: 'Инвойс_декларация',
                eng: null,
                ru: null,
                redefineCell: { offset: { x: 0, y: -1 }, cell: { value: null } },
            },
            ...commonObj.EXWCFR, ...commonObj.export,
        ],
        exw: [
            {
                name: 'Инвойс_декларация',
                eng: declarationNo,
                ru: declarationNo,
            },
            {
                name: 'Инвойс_транспорт',
                deleteRows: { start: -1, end: 1 },
            },
            ...commonObj.EXWCFR, ...commonObj.export,
        ],
        fcaNonCom: [
            {
                name: 'Инвойс',
                eng: `Non-commercial invoice № ${invoiceNo} dated ${date.invoice('eng')}`,
                ru: `Некоммерческий инвойс № ${invoiceNo} от ${date.invoice('ru')}`,
            },
            {
                name: 'Инвойс_декларация',
                deleteRows: { start: -1, end: 1 },
            },
            ...commonObj.FCA, ...commonObj.export,
        ],
        fcaCom: [
            {
                name: 'Инвойс',
                eng: `Commercial invoice № ${invoiceNo} dated ${date.invoice('eng')}`,
                ru: `Коммерческий инвойс № ${invoiceNo} от ${date.invoice('ru')}`,
            },
            {
                name: 'Инвойс_условия',
                eng: declarationNo,
                ru: declarationNo,
                redefineCell: { offset: { x: 0, y: -1 }, cell: { value: 'Temporary Customs Declaration' }, cellRu: { value: '№ временной декларации на товары' } },
            },
            ...commonObj.FCA, ...commonObj.export,
        ],
        storage: [
            {
                name: 'Инвойс',
                eng: `Non-commercial invoice № ${invoiceNo} dated ${date.invoice('eng')}`,
                ru: `Некоммерческий инвойс № ${invoiceNo} от ${date.invoice('ru')}`,
            },
            {
                name: 'Инвойс_соглашение',
                eng: `to the Agreement No. ${agreementNo} from ${date.agreement('eng')}`,
                ru: `к Дополнению No. ${agreementNo} от ${date.agreement('ru')}`,
            },
            {
                name: 'Инвойс_контракт',
                eng: `to the Storage Services Contract No. ${contract.contractNo}`,
                ru: `к контракту оказания услуг хранения № ${contract.contractNo}`,
            },
            // something wrong with redefineCell fn prop (there is no need to use it here but
            // styles broke without it) Styles changes depending on cell place in array
            {
                name: 'Инвойс_покупатель_заголовок',
                eng: 'Contractor:',
                ru: 'Исполнитель:',
            },
            {
                name: 'Инвойс_декларация',
                eng: null,
                ru: null,
                font: { bold: false },
                redefineCell: {
                    offset: { x: 0, y: -1 },
                    commonStyles: {
                        alignment: { vertical: 'middle', wrapText: true },
                        font: { bold: false },
                    },
                    cell: { value: '* This price given exclusively for customs clearance' },
                    cellRu: { value: '* Данная цена указана исключительно для таможенного оформления', alignment: { wrapText: true }, font: { bold: false } },
                },
            },
            {
                name: 'Инвойс_получатель_заголовок',
                eng: 'Customer:',
                ru: 'Заказчик:',
                font: { bold: true },
            },

            // end error block
            {
                name: 'Инвойс_банк_получателя',
                eng: null,
            },
            {
                name: 'Инвойс_банк_получателя_адрес',
                eng: null,
            },
            {
                name: 'Инвойс_банк_получателя_свифт',
                eng: null,
            },
            {
                name: 'Инвойс_получатель_в_пользу',
                eng: null,
            },
            {
                name: 'Инвойс_получатель_счет',
                eng: null,
            },
        ],

    } satisfies CellDeclarationT<CellObjT>;

    const cells = [...cellsObj.common] as CellSettingsCommonT[];

    if (type === 'exportT') {
        if (terms === 'EXW') {
            cells.push(...cellsObj.exw);
        }
        if (terms === 'CFR') {
            cells.push(...cellsObj.cfr);
        }
        if (terms === 'FCA') {
            cells.push(...cellsObj.fcaCom);
        }
    }

    if (type === 'exportStorageT') {
        if (terms === 'EXW') {
            cells.push(...cellsObj.storage);
        }
        if (terms === 'FCA') {
            cells.push(...cellsObj.fcaNonCom);
        }
    }

    return cells;
};
