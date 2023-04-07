import { Worksheet } from 'exceljs';
import exportContractStore from '../../../../../stores/docsStores/exportContractStore';
import { InvoiceT } from '../../../../../types/typesContract';
import { initExcelUtils } from '../../../../excel/utils/excelUtilsObj/initExcelUtils';
import { getExcelDateStr } from '../../../../excel/utils/getExcelDate';
import { initDepartureInfoCells } from './initDepartureInfoCells';
import { initInvoiceBls } from './initInvoiceBls';

export const setComInvoice = (ws: Worksheet, invoice: InvoiceT) => {
    const utils = initExcelUtils(ws);

    const {
        seller,
        agent,
        consignee,
        transport,
        portFrom,
        portTo,
        agreementNo,
        date,
        contract,
        terms,
        vessel,
        amount,
        bankSeller,
    } = invoice.agreement.record;
    const { invoiceDate, invoiceNo, msc } = invoice;
    const { places, placesTotal, price, priceTotal } = amount;

    const engDepartureCells = [
        { cell: 'Инвойс_декларация', value: '' },
        { cell: 'Инвойс_дата', value: getExcelDateStr(invoiceDate, 'en') },
        { cell: 'Инвойс_транспорт', value: transport.nameEng },
        { cell: 'Инвойс_куда', value: `${portTo.nameEng}, ${portTo.countryEng}` },
        { cell: 'Инвойс_откуда', value: portFrom.nameEng },
    ];
    // prettier-ignore
    const cellsEng =  [
        { cell: 'Инвойс_продавец', value: seller.nameEng},
        { cell: 'Инвойс_продавец', value: seller.nameEng},
        { cell: 'Инвойс_продавец_адрес', value: seller.addresEng },
        { cell: 'Инвойс', value: `${invoiceNo} from ${getExcelDateStr(invoiceDate, 'en')}`},
        { cell: 'МСЦ', value: msc ? 'MSC certified' : 'Non-MSC product' },
        { cell: 'МСЦ_сертификат', value: msc ? 'MSC-C-52870' : '' },

        { cell: 'Инвойс_получатель', value: consignee.fullName },
        { cell: 'Инвойс_получатель_адрес', value: consignee.adress },
        { cell: 'Инвойс_покупатель', value: agent.name },
        { cell: 'Инвойс_покупатель_адрес', value: agent.adress },

        ...engDepartureCells,

        { cell: 'Инвойс_соглашение', value: `AGREEMENT No.${agreementNo} from ${getExcelDateStr(date, 'en')}`},
        { cell: 'Инвойс_контракт', value: `to a contract of sale No. ${contract.contractNo}`},
        { cell: 'Инвойс_контракт_дата', value: `Magadan, dated from ${getExcelDateStr(contract.date, 'en')}`},
        { cell: 'Инвойс_условия', value: `${terms}, ${portTo.countryEng}`},

        {cell: 'Инвойс_судно',value: vessel.nameEng},
        {cell: 'Инвойс_подвал_места',value: `${places.str} PCS /`},
        {cell: 'Инвойс_подвал_всего',value: `${placesTotal.str} tn`},
        {cell: 'Инвойс_подвал_сумма',value: `${priceTotal.str} USD`},
        {cell: 'Инвойс_банк_получателя', value: `Beneficiary Bank: ${bankSeller.nameEng}`},
        {cell: 'Инвойс_банк_получателя_адрес',value: bankSeller.adress},
        {cell: 'Инвойс_банк_получателя_свифт', value: `SWIFT: ${bankSeller.swift}`},
        
        {cell: 'Инвойс_получатель_в_пользу', value: `in forward to ${seller.nameEng}`},
        {cell: 'Инвойс_получатель_счет', value: `A/C: ${bankSeller.accountNo}`},
        {cell: 'Инвойс_подписант',value: `Signed by ${exportContractStore.podpisant.nameEng}`},
    ];

    const ruDepartureCells = [
        { cell: 'Инвойс_декларация_п', value: '' },
        { cell: 'Инвойс_дата_п', value: getExcelDateStr(invoiceDate, 'ru') },
        { cell: 'Инвойс_транспорт_п', value: transport.name },
        { cell: 'Инвойс_куда_п', value: `${portTo.name}, ${portTo.country}` },
        { cell: 'Инвойс_откуда_п', value: portFrom.fullName },
    ];

    // prettier-ignore
    const cellsRu =  [
        { cell: 'Инвойс_продавец_п', value: seller.nameEng},
        { cell: 'Инвойс_продавец_п', value: seller.nameEng},
        { cell: 'Инвойс_продавец_адрес_п', value: seller.addresEng },
        { cell: 'Инвойс_п', value: `${invoiceNo} от ${getExcelDateStr(invoiceDate, 'ru')}`},
        { cell: 'МСЦ_п', value: msc ? 'MSC certified' : 'Non-MSC product' },
        { cell: 'МСЦ_сертификат_п', value: msc ? 'MSC-C-52870' : '' },

        { cell: 'Инвойс_получатель_п', value: consignee.fullName },
        { cell: 'Инвойс_получатель_адрес_п', value: consignee.adress },
        { cell: 'Инвойс_покупатель_п', value: agent.name },
        { cell: 'Инвойс_покупатель_адрес_п', value: agent.adress },

        ...ruDepartureCells,

        { cell: 'Инвойс_соглашение_п', value: `Дополнение No.${agreementNo} от ${getExcelDateStr(date, 'ru')}`},
        { cell: 'Инвойс_контракт_п', value: `к контракту купли-продажи №. ${contract.contractNo}`},
        { cell: 'Инвойс_контракт_дата_п', value: `Магадан, от ${getExcelDateStr(contract.date, 'ru')}`},
        { cell: 'Инвойс_условия_п', value: `${terms}, ${portTo.country}`},

        { cell: 'Инвойс_судно_п', value: vessel.name},
        { cell: 'Инвойс_подвал_места_п', value: `${places.str} шт /`},
        { cell: 'Инвойс_подвал_всего_п', value: `${placesTotal.str} тн`},
        { cell: 'Инвойс_подвал_сумма_п', value: `${priceTotal.str} $`},
        { cell: 'Инвойс_банк_получателя_п', value: `Beneficiary Bank: ${bankSeller.nameEng}`},
        { cell: 'Инвойс_банк_получателя_адрес_п', value: bankSeller.adress},
        { cell: 'Инвойс_банк_получателя_свифт_п', value: `SWIFT: ${bankSeller.swift}`},
        
        { cell: 'Инвойс_получатель_в_пользу_п', value: `в пользу ${seller.name}`},
        { cell: 'Инвойс_получатель_счет_п', value: `A/C: ${bankSeller.accountNo}`},
        { cell: 'Инвойс_подписант_п', value: `Подписано ${exportContractStore.podpisant.name}`},
    ];

    initDepartureInfoCells(
        [...engDepartureCells, ...ruDepartureCells],
        utils,
        terms
    );

    const cells = [...cellsEng, ...cellsRu];
    cells.forEach((cell) => utils.setCell(cell));

    initInvoiceBls(utils, invoice, 'ru');
    initInvoiceBls(utils, invoice, 'eng');

    return cells;
};
