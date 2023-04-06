import { InitInvoicePartT } from '../../../../../types/typesExcelUtils';
import { getExcelDateStr } from '../../../../excel/utils/getExcelDate';

export const initInvoiceHeader: InitInvoicePartT = (utils, invoice) => {
    const { setCell } = utils;
    const { seller } = invoice.agreement.record;
    const { invoiceDate, invoiceNo, msc } = invoice;

    setCell({
        cell: 'Инвойс_продавец',
        value: seller.nameEng,
    });
    setCell({
        cell: 'Инвойс_продавец_адрес',
        value: seller.addresEng,
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
