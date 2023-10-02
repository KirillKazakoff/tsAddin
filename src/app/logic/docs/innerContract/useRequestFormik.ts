/* eslint-disable no-param-reassign */
import requestContractStore from '../../../stores/docsStores/requestContractStore';
import { useMyFormik } from '../../../components/Form/useMyFormik';

export const useRequestFormik = () => {
    return useMyFormik({
        store: requestContractStore,
        initialFields: {
            isInvoiceOnly: false,
            reiceNo: '',
            terms: '',
            portTamozhnya: '',
            portRu: '',
        },
        validateCb: (errors, values) => {
            if (!values.terms) {
                errors.terms = 'valueMissing';
            }
            if (!values.portTamozhnya) {
                errors.portTamozhnya = 'valueMissing';
            }
            if (!values.portRu) {
                errors.portRu = 'valueMissing';
            }
        },
    });
};
