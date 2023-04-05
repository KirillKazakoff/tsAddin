import { InitInvoicePartT } from '../../../../../types/typesExcelUtils';
import { getExcelDateStr } from '../../../../excel/utils/getExcelDate';

export const initInvoiceHeaderRu: InitInvoicePartT = (utils, invoice) => {
    const { setCell } = utils;
    const { sellerInfo } = invoice.agreement;
    const { invoiceDate, invoiceNo, msc } = invoice;

    setCell({
        cell: 'Инвойс_продавец_п',
        value: sellerInfo.fullName,
    });
    setCell({
        cell: 'Инвойс_продавец_адрес_п',
        value: sellerInfo.addres,
    });

    setCell({
        cell: 'Инвойс_п',
        value: `${invoiceNo} от ${getExcelDateStr(invoiceDate, 'ru')}`,
    });

    setCell({
        cell: 'МСЦ_п',
        value: msc ? 'MSC certified' : 'Non-MSC product',
    });
    setCell({
        cell: 'МСЦ_сертификат_п',
        value: msc ? 'MSC-C-52870' : '',
    });
};
