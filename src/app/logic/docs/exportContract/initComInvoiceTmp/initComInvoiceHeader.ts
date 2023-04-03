import { InitInvoiceT } from '../../../../types/typesUtils';
import { getExcelDateStr } from '../../../excel/utils/getExcelDate';

export const initComInvoiceHeader: InitInvoiceT = (utils, invoice) => {
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
        value: msc ? 'MSC certified' : '',
    });
    setCell({
        cell: 'МСЦ_сертификат',
        value: 'MSC-C-52870',
    });
};
