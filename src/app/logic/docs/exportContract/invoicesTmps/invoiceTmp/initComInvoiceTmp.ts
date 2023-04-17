import { Worksheet } from 'exceljs';
import exportContractStore from '../../../../../stores/docsStores/exportContractStore';
import { InvoiceT } from '../../../../../types/typesContract';
import { initExcelUtils } from '../../../../excel/utils/excelUtilsObj/initExcelUtils';
import { getExcelDateStr } from '../../../../excel/utils/getExcelDate';
import { initComInvoiceEXW } from './initComInvoiceEXW';
import { initInvoiceBlRows } from './initInvoiceBlRows';

export const initComInvoiceTmp = (ws: Worksheet, invoice: InvoiceT) => {
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
        bankSeller,
    } = invoice.agreement.record;
    const {
        invoiceDate, invoiceNo, msc, amount,
    } = invoice;

    const { places, placesTotal, priceTotal } = amount;

    // invoiceEng
    const engDepartureCells = [
        { cell: 'Инвойс_декларация', value: '' },
        { cell: 'Инвойс_дата', value: getExcelDateStr(invoiceDate, 'en') },
        { cell: 'Инвойс_транспорт', value: transport.eng.name },
        { cell: 'Инвойс_куда', value: `${portTo.eng.name}, ${portTo.eng.country}` },
        { cell: 'Инвойс_откуда', value: portFrom.eng.name },
    ];
    // prettier-ignore
    const cellsEng = [
        { cell: 'Инвойс_продавец', value: seller.eng.name },
        { cell: 'Инвойс_продавец_адрес', value: seller.eng.addres },
        { cell: 'Инвойс', value: `${invoiceNo} from ${getExcelDateStr(invoiceDate, 'en')}` },
        { cell: 'МСЦ', value: msc ? 'MSC certified' : 'Non-MSC product' },
        { cell: 'МСЦ_сертификат', value: msc ? 'MSC-C-52870' : '' },

        { cell: 'Инвойс_получатель', value: consignee.fullName },
        { cell: 'Инвойс_получатель_адрес', value: consignee.adress },
        { cell: 'Инвойс_покупатель', value: agent.name },
        { cell: 'Инвойс_покупатель_адрес', value: agent.addres },

        ...engDepartureCells,

        { cell: 'Инвойс_соглашение', value: `AGREEMENT No.${agreementNo} from ${getExcelDateStr(date, 'en')}` },
        { cell: 'Инвойс_контракт', value: `to a contract of sale No. ${contract.contractNo}` },
        { cell: 'Инвойс_контракт_дата', value: `Magadan, dated from ${getExcelDateStr(contract.date, 'en')}` },
        { cell: 'Инвойс_условия', value: `${terms}, ${portTo.eng.country}` },

        // { cell: 'Инвойс_судно', value: vessel.eng.name },
        { cell: 'Инвойс_подвал_места', value: `${places.str} PCS /` },
        { cell: 'Инвойс_подвал_всего', value: `${placesTotal.str} tn` },
        { cell: 'Инвойс_подвал_сумма', value: `${priceTotal.str} USD` },
        { cell: 'Инвойс_банк_получателя', value: `Beneficiary Bank: ${bankSeller.eng.name}` },
        { cell: 'Инвойс_банк_получателя_адрес', value: bankSeller.adress },
        { cell: 'Инвойс_банк_получателя_свифт', value: `SWIFT: ${bankSeller.swift}` },

        { cell: 'Инвойс_получатель_в_пользу', value: `in forward to ${bankSeller.eng.name}` },
        { cell: 'Инвойс_получатель_счет', value: `A/C: ${bankSeller.accountNo}` },
        { cell: 'Инвойс_подписант', value: `Signed by ${exportContractStore.podpisant.eng.name}` },
    ];

    // invoiceRu
    const ruDepartureCells = [
        { cell: 'Инвойс_декларация_п', value: '' },
        { cell: 'Инвойс_дата_п', value: getExcelDateStr(invoiceDate, 'ru') },
        { cell: 'Инвойс_транспорт_п', value: transport.ru.name },
        { cell: 'Инвойс_куда_п', value: `${portTo.ru.name}, ${portTo.ru.country}` },
        { cell: 'Инвойс_откуда_п', value: portFrom.ru.name },
    ];

    // prettier-ignore
    const cellsRu = [
        { cell: 'Инвойс_продавец_п', value: seller.ru.name },
        { cell: 'Инвойс_продавец_адрес_п', value: seller.ru.addres },
        { cell: 'Инвойс_п', value: `${invoiceNo} от ${getExcelDateStr(invoiceDate, 'ru')}` },
        { cell: 'МСЦ_п', value: msc ? 'MSC certified' : 'Non-MSC product' },
        { cell: 'МСЦ_сертификат_п', value: msc ? 'MSC-C-52870' : '' },

        { cell: 'Инвойс_получатель_п', value: consignee.fullName },
        { cell: 'Инвойс_получатель_адрес_п', value: consignee.adress },
        { cell: 'Инвойс_покупатель_п', value: agent.name },
        { cell: 'Инвойс_покупатель_адрес_п', value: agent.addres },

        ...ruDepartureCells,

        { cell: 'Инвойс_соглашение_п', value: `Дополнение No.${agreementNo} от ${getExcelDateStr(date, 'ru')}` },
        { cell: 'Инвойс_контракт_п', value: `к контракту купли-продажи №. ${contract.contractNo}` },
        { cell: 'Инвойс_контракт_дата_п', value: `Магадан, от ${getExcelDateStr(contract.date, 'ru')}` },
        { cell: 'Инвойс_условия_п', value: `${terms}, ${portTo.ru.country}` },

        // { cell: 'Инвойс_судно_п', value: vessel.ru.name },
        { cell: 'Инвойс_подвал_места_п', value: `${places.str} шт /` },
        { cell: 'Инвойс_подвал_всего_п', value: `${placesTotal.str} тн` },
        { cell: 'Инвойс_подвал_сумма_п', value: `${priceTotal.str} $` },
        { cell: 'Инвойс_банк_получателя_п', value: `Beneficiary Bank: ${bankSeller.eng.name}` },
        { cell: 'Инвойс_банк_получателя_адрес_п', value: bankSeller.adress },
        { cell: 'Инвойс_банк_получателя_свифт_п', value: `SWIFT: ${bankSeller.swift}` },

        { cell: 'Инвойс_получатель_в_пользу_п', value: `в пользу ${bankSeller.ru.name}` },
        { cell: 'Инвойс_получатель_счет_п', value: `A/C: ${bankSeller.accountNo}` },
        { cell: 'Инвойс_подписант_п', value: `Подписано ${exportContractStore.podpisant.ru.name}` },
    ];

    const cells = [...cellsEng, ...cellsRu];
    cells.forEach((cell) => {
        try {
            utils.setCell(cell);
        } catch (e) {
            console.log(cell);
        }
    });

    initComInvoiceEXW([...engDepartureCells, ...ruDepartureCells], utils, terms);

    initInvoiceBlRows(utils, invoice);

    return cells;
};
