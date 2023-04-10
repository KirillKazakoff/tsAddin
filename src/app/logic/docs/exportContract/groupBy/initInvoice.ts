import { initAmount } from '../../../../stores/tablesStore/utils/initAmount';
import { ProductInfoExportT } from '../../../../types/typesContract';
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
    };

    return invoice;
};
