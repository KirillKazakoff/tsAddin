import exportContractStore from '../../../../stores/docsStores/exportContractStore';
import {
    CellObjDoubleT as CellDoubleT,
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
    } = invoice.record;

    const date = {
        agreement: (locale: string) => getExcelDateStr(docDate, locale),
        invoice: (language: string) => getExcelDateStr(docDate, language),
        contract: (language: string) => getExcelDateStr(contract.date, language),
    };
    const { podpisant, isNonComFCA } = exportContractStore.fields;

    // prettier-ignore
    const doubleObj = {
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
                isEmptyTitle: invoice.record.terms === 'FCA' || invoice.record.terms === 'EXW',
            },
            {
                name: 'Инвойс_куда',
                eng: `${portTo.eng.name}, ${portTo.eng.country}`,
                ru: `${portTo.ru.name}, ${portTo.ru.country}`,
                isEmptyTitle: invoice.record.terms === 'EXW' && !isNonComFCA,
            },
            {
                name: 'Инвойс_откуда',
                eng: `${portFrom?.eng?.name}`,
                ru: `${portFrom?.ru?.name}`,
                isEmptyTitle: invoice.record.terms === 'FCA' || invoice.record.terms === 'EXW',
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
        exportDefault: [
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
            {
                name: 'Инвойс_декларация',
                eng: declarationNo,
                ru: declarationNo,
                isEmptyTitle: invoice.record.terms !== 'EXW',
            },
        ],
        exportStorage: [
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
        fca: [
            {
                name: 'Инвойс',
                eng: `Non-commercial invoice № ${invoiceNo} dated ${date.invoice('eng')}`,
                ru: `Некоммерческий инвойс № ${invoiceNo} от ${date.invoice('ru')}`,
            },
        ],
    } satisfies CellDeclarationT<CellDoubleT>;

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

    const singleCells = [...singleObj.common];
    const doubleCells = [...doubleObj.common];

    if (invoice.record.type === 'exportT') {
        singleCells.push(...singleObj.exportDefault);
        doubleCells.push(...doubleObj.exportDefault);
    }
    if (invoice.record.type === 'exportStorageT') {
        doubleCells.push(...doubleObj.exportStorage);
    }
    if (terms === 'FCA' && isNonComFCA) {
        doubleCells.push(...doubleObj.fca);
    }

    return { double: doubleCells, single: singleCells };
};
