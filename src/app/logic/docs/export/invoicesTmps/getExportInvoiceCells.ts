/* eslint-disable max-len */
import exportContractStore from '../../../../stores/docsStores/exportContractStore';
import {
    CellObjDoubleT as CellDoubleT,
    CellSettingsCommonT,
    CellObjT as CellSingleT,
} from '../../../../types/typesExcelUtils';
import { CellDeclarationT } from '../../../../types/typesUtils';
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

    const singleObj = {
        common: [
            {
                name: 'Инвойс_подписант',
                value: `Signed by ${podpisant.eng.name} / ${podpisant.ru.name}`,
            },
        ],
        exportDefault: [
            {
                name: 'Инвойс_банк_получателя',
                value: `Beneficiary Bank: ${bankSeller.eng.name}`,
            },
            {
                name: 'Инвойс_банк_получателя_адрес',
                value: `Bank address: ${bankSeller.address}`,
            },
            {
                name: 'Инвойс_банк_получателя_свифт',
                value: `SWIFT: ${bankSeller.swift}`,
            },
            {
                name: 'Инвойс_получатель_в_пользу',
                value: `in forward to ${seller.eng.name}`,
            },
            {
                name: 'Инвойс_получатель_счет',
                value: `A/C: ${bankSeller.accountNo}`,
            },
        ],
    } satisfies CellDeclarationT<CellSingleT>;

    const commonObj = {
        common: [
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
                name: 'Инвойс_транспорт',
                eng: `${portTo.eng.name}, ${portTo.eng.country}`,
                ru: `${portTo.ru.name}, ${portTo.ru.country}`,
                defineCell: {
                    offset: { x: 0, y: -1 },
                    cell: { value: 'To' },
                    cellRu: { value: 'Порт назначения' },
                },
            },
            {
                name: 'Инвойс_куда',
                eng: `${terms}, ${portTo.eng.name}`,
                ru: `${terms}, ${portTo.ru.name}`,
                defineCell: {
                    offset: { x: 0, y: -1 },
                    cell: { value: 'Terms of delivery and payment' },
                    cellRu: { value: 'Условия доставки и оплаты' },
                },
            },
            {
                name: 'Инвойс_откуда',
                eng: null,
                ru: null,
                defineCell: { offset: { x: 0, y: -1 }, cell: { value: null } },
            },
            {
                name: 'Инвойс_декларация',
                eng: null,
                ru: null,
                defineCell: { offset: { x: 0, y: -1 }, cell: { value: null } },
            },
        ],
    } satisfies CellDeclarationT<CellDoubleT>;

    // prettier-ignore
    const doubleObj = {
        common: commonObj.common,
        cfr: [
            {
                name: 'Инвойс_декларация',
                eng: '',
                ru: '',
                defineCell: { offset: { x: 0, y: -1 }, cell: { value: '' } },
            },
            ...commonObj.EXWCFR,
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
            ...commonObj.EXWCFR,
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
            ...commonObj.FCA,
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
                defineCell: { offset: { x: 0, y: -1 }, cell: { value: 'Temporary Customs Declaration' }, cellRu: { value: '№ временной декларации на товары' } },
            },
            ...commonObj.FCA,
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
        ],

    } satisfies CellDeclarationT<CellDoubleT>;

    const singleCells = [...singleObj.common];
    const doubleCells = [...doubleObj.common] as CellSettingsCommonT[];

    if (type === 'exportT') {
        singleCells.push(...singleObj.exportDefault);

        if (terms === 'EXW') {
            doubleCells.push(...doubleObj.exw);
        }
        if (terms === 'CFR') {
            doubleCells.push(...doubleObj.cfr);
        }
        if (terms === 'FCA') {
            doubleCells.push(...doubleObj.fcaCom);
        }
    }

    if (type === 'exportStorageT') {
        if (terms === 'EXW') {
            doubleCells.push(...doubleObj.storage);
        }
        if (terms === 'FCA') {
            doubleCells.push(...doubleObj.fcaNonCom);
        }
    }

    return { double: doubleCells, single: singleCells };
};
