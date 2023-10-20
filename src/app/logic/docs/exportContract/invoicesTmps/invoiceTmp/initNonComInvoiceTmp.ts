import { Worksheet } from 'exceljs';
import exportContractStore from '../../../../../stores/docsStores/exportContractStore';
import { initExcelUtils } from '../../../../excel/utils/excelUtilsObj/initExcelUtils';
import { getExcelDateStr } from '../../../../excel/utils/getExcelDate';
import { initInvoiceRows } from './initInvoiceRows';
import { initAgent } from '../initAgent';
import { InvoiceT } from '../../groupBy/initInvoice';

export const initNonComInvoiceTmp = (ws: Worksheet, invoice: InvoiceT) => {
    const utils = initExcelUtils(ws);

    const {
        seller, transport, portFrom, portTo, agreementNo, contract,
    } = invoice.agreement.record;
    const {
        invoiceDate, invoiceNo, msc, amount, consignee,
    } = invoice;
    const agent = initAgent(invoice);

    const { places, placesTotal, priceTotal } = amount;
    const date = {
        invoice: (language: string) => getExcelDateStr(invoiceDate, language),
        contract: (language: string) => getExcelDateStr(contract.date, language),
    };
    // invoiceEng
    // prettier-ignore
    const cellsEng = [
        { cell: 'Инвойс_продавец', value: seller.eng.name },
        { cell: 'Инвойс_продавец_адрес', value: seller.eng.address },
        { cell: 'Инвойс', value: `${invoiceNo} from ${date.invoice('eng')}` },
        { cell: 'МСЦ', value: msc ? 'MSC certified' : 'Non-MSC certified' },
        { cell: 'МСЦ_сертификат', value: msc ? 'MSC-C-52870' : '' },

        { cell: 'Инвойс_получатель', value: consignee.fullName },
        { cell: 'Инвойс_получатель_адрес', value: consignee.addres },
        { cell: 'Инвойс_покупатель', value: agent.name },
        { cell: 'Инвойс_покупатель_адрес', value: agent.address },

        { cell: 'Инвойс_транспорт', value: transport.eng.name },
        { cell: 'Инвойс_куда', value: `${portTo.eng.name}, ${portTo.eng.country}` },
        { cell: 'Инвойс_откуда', value: portFrom.eng.name },

        { cell: 'Инвойс_соглашение', value: `Supplementary agreement No.${agreementNo} from ${date.invoice('eng')}` },
        { cell: 'Инвойс_контракт', value: `to the Storage services contract of sale No. ${contract.contractNo}` },
        { cell: 'Инвойс_контракт_дата', value: `Magadan, dated from ${date.contract('eng')}` },

        { cell: 'Инвойс_подвал_места', value: `${places.str} PCS /` },
        { cell: 'Инвойс_подвал_всего', value: `${placesTotal.str} tn` },
        { cell: 'Инвойс_подвал_сумма', value: `${priceTotal.str} USD` },

        { cell: 'Инвойс_подписант', value: `Signed by ${exportContractStore.fields.podpisant.eng.name}` },
    ];

    // invoiceRu
    // prettier-ignore
    const cellsRu = [
        { cell: 'Инвойс_продавец_п', value: seller.ru.name },
        { cell: 'Инвойс_продавец_адрес_п', value: seller.ru.address },
        { cell: 'Инвойс_п', value: `${invoiceNo} от ${date.invoice('ru')}` },
        { cell: 'МСЦ_п', value: msc ? 'MSC certified' : 'Non-MSC certified' },
        { cell: 'МСЦ_сертификат_п', value: msc ? 'MSC-C-52870' : '' },

        { cell: 'Инвойс_получатель_п', value: consignee?.fullName },
        { cell: 'Инвойс_получатель_адрес_п', value: consignee?.addres },
        { cell: 'Инвойс_покупатель_п', value: agent.name },
        { cell: 'Инвойс_покупатель_адрес_п', value: agent.address },

        { cell: 'Инвойс_транспорт_п', value: transport.ru.name },
        { cell: 'Инвойс_куда_п', value: `${portTo.ru.name}, ${portTo.ru.country}` },
        { cell: 'Инвойс_откуда_п', value: portFrom.ru.name },

        { cell: 'Инвойс_соглашение_п', value: `Дополнительное соглашение No.${agreementNo} от ${date.invoice('ru')}` },
        { cell: 'Инвойс_контракт_п', value: `к контракту оказания услуг хранения №. ${contract.contractNo}` },
        { cell: 'Инвойс_контракт_дата_п', value: `Магадан, от ${date.contract('ru')}` },

        { cell: 'Инвойс_подвал_места_п', value: `${places.str} мест /` },
        { cell: 'Инвойс_подвал_всего_п', value: `${placesTotal.str} тн` },
        { cell: 'Инвойс_подвал_сумма_п', value: `${priceTotal.str} $` },

        { cell: 'Инвойс_подписант_п', value: `Подписано ${exportContractStore.fields.podpisant.ru.name}` },
    ];

    const cells = [...cellsEng, ...cellsRu];
    cells.forEach((cell) => {
        utils.setCell(cell);
    });

    initInvoiceRows(utils, invoice);
    return cells;
};
