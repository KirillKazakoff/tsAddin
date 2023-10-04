/* eslint-disable no-param-reassign */
import { useInitSection } from '../../../components/Form/useInitSection';
import { useMyFormik } from '../../../components/Form/useMyFormik';
import requestContractStore from '../../../stores/docsStores/requestContractStore';
import { createRequestContract } from './createRequestContract';
import { groupByContractNo } from './groupByContractNo';

export const useInitRequestSection = () => {
    const formik = useMyFormik({
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

    return useInitSection({
        store: requestContractStore as any,
        docs: Object.values(groupByContractNo()),
        getSettings: () => ({
            formik,
            loadCb: createRequestContract,
        }),
    });
};
