import { initAmount } from '../../../../stores/tablesStore/utils/initAmount';
import { ProductInfoExportT } from '../../../../types/typesContract';
import { getExcelDateStr } from '../../../excel/utils/getExcelDate';
import { AgreementT } from './initAgreement';

export const initInvoice = (product: ProductInfoExportT, agreement: AgreementT) => {
    const { record } = product;
    const {
        invoice: invoiceNo, date: invoiceDate, msc, consignee,
    } = record;

    const invoice = {
        products: [],
        invoiceDate,
        invoiceNo,
        msc,
        agreement,
        consignee,
        amount: {
            places: initAmount(),
            priceTotal: initAmount(),
            placesTotal: initAmount(),
        },
        invoiceStr: {
            eng: `${invoiceNo} from ${getExcelDateStr(invoiceDate, 'en')}`,
            ru: `${invoiceNo} от ${getExcelDateStr(invoiceDate, 'ru')}`,
        },
    };

    return invoice;
};
