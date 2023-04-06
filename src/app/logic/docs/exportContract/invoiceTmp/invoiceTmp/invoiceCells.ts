import { InvoiceT } from '../../../../../types/typesContract';
import { CellObjT } from '../../../../../types/typesExcelUtils';
import { getExcelDateStr } from '../../../../excel/utils/getExcelDate';

type CellsDocT = (invoice: InvoiceT) => CellObjT[];

export const setInvoiceCells: CellsDocT = (invoice: InvoiceT) => {
    const {
        seller, agent, consignee, transport, portFrom, portTo, toStr,
    } = invoice.agreement.record;
    const { invoiceDate, invoiceNo, msc } = invoice;

    return [
        { cell: 'Инвойс_продавец', value: seller.nameEng },
        { cell: 'Инвойс_продавец_адрес', value: seller.addresEng },
        { cell: 'Инвойс', value: toStr.invoice.eng },
        { cell: 'МСЦ', value: msc ? 'MSC certified' : 'Non-MSC product' },
        { cell: 'МСЦ_сертификат', value: msc ? 'MSC-C-52870' : '' },

        { cell: 'Инвойс_получатель', value: consignee.fullName },
        { cell: 'Инвойс_получатель_адрес', value: consignee.adress },
        { cell: 'Инвойс_покупатель', value: agent.name },
        { cell: 'Инвойс_покупатель_адрес', value: agent.adress },
        { cell: 'Инвойс_декларация', value: '' },
        { cell: 'Инвойс_дата', value: getExcelDateStr(invoiceDate, 'en') },
        { cell: 'Инвойс_транспорт', value: transport.nameEng },
        { cell: 'Инвойс_куда', value: `${portTo.nameEng}, ${portTo.countryEng}` },
        { cell: 'Инвойс_откуда', value: portFrom.nameEng },
        { cell: 'Инвойс_соглашение', value: toStr.agreement.eng },
    ];
};
