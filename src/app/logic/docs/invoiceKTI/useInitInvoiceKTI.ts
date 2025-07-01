/* eslint-disable no-param-reassign */
import { useInitSection } from '../../../components/Form/useInitSection';
import { useMyFormik } from '../../../components/Form/useMyFormik';
import invoicesKTIStore from '../../../stores/docsStores/invoicesKTIStore';
import { initExcelUtils } from '../../excel/utils/excelUtilsObj/initExcelUtils';
import { groupInvoiceKTIByNo } from './groupInvoiceKTIByNo';
import { initInvoiceKTItmp } from './initInvoiceKTItmp';

export const useInitInvoiceKTI = () => {
    const formik = useMyFormik({
        store: invoicesKTIStore,
        initialFields: {
            translator: 'KIA',
        },
        validateCb(errors, values) {
            if (!values.translator) errors.translator = 'valueMissing';
        },
    });

    return useInitSection({
        store: invoicesKTIStore as any,
        docs: groupInvoiceKTIByNo(),
        getSettings: () => ({
            formik,
            createDoc: (doc) => {
                let fileName = '';
                const { row } = doc.record;

                if (doc.record.type === 'dischargeInvoicesT') {
                    fileName = `KTI Discharge invoice - ${row.id} ${row.seller.code}`;
                } else {
                    fileName = `KTI Storage invoice - ${row.id} ${row.seller.code}`;
                }

                return {
                    tmpPath: 'invoiceKTIDischarge',
                    initTmpsCb: async (book) => {
                        const ws = book.getWorksheet('Invoice_KTI');
                        const utils = initExcelUtils(ws, '');

                        await initInvoiceKTItmp(book, doc);

                        utils.getRow('Инвойс_п_граница').addPageBreak();
                    },
                    fileName,
                };
            },
        }),
    });
};
