/* eslint-disable no-param-reassign */
import { useInitSection } from '../../../../components/Form/useInitSection';
import { useMyFormik } from '../../../../components/Form/useMyFormik';
import requestContractStore from '../../../../stores/docsStores/requestContractStore';
import { createRequestContract } from './createRequestContract';
import { groupInnerContracts } from '../groupInnerContracts';

export const useInitRequestSection = () => {
    const formik = useMyFormik({
        store: requestContractStore,
        initialFields: {
            isInvoiceOnly: false,
            reiceNo: '',
            terms: '',
            portTamozhnya: '',
        },
        validateCb: (errors, values) => {
            if (!values.terms) {
                errors.terms = 'valueMissing';
            }
            if (!values.portTamozhnya) {
                errors.portTamozhnya = 'valueMissing';
            }
        },
    });

    return useInitSection({
        store: requestContractStore as any,
        docs: groupInnerContracts(),
        getSettings: () => ({
            formik,
            loadCb: createRequestContract,
        }),
    });
};
