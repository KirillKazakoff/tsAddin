import { InitInvoicePartT } from '../../../../types/typesExcelUtils';
import { getExcelDateStr } from '../../../excel/utils/getExcelDate';

export const initComInvoiceHeader: InitInvoicePartT = (utils, invoice) => {
    const { setCell } = utils;
    const { sellerInfo } = invoice.agreement;
    const { invoiceDate, invoiceNo, msc } = invoice;

    setCell({
        cell: 'Инвойс_продавец',
        value: sellerInfo.fullName,
    });
    setCell({
        cell: 'Инвойс_продавец_адрес',
        value: sellerInfo.addres,
    });

    setCell({
        cell: 'Инвойс',
        value: `${invoiceNo} from ${getExcelDateStr(invoiceDate, 'en')}`,
    });

    setCell({
        cell: 'МСЦ',
        value: msc ? 'MSC certified' : 'Non-MSC product',
    });
    setCell({
        cell: 'МСЦ_сертификат',
        value: msc ? 'MSC-C-52870' : '',
    });
};
