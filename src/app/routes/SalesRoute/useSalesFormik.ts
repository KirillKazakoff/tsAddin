/* eslint-disable no-param-reassign */
import salesContractStore from '../../stores/docsStores/salesContractStore';
import { useMyFormik } from '../../components/Form/useMyFormik';

export const useSalesFormik = () => {
    return useMyFormik({
        store: salesContractStore,
        initialFields: {
            filling: '',
        },
        validateCb: (errors, values) => {
            if (salesContractStore.currentRecord.isLive) {
                if (!values.filling) {
                    errors.filling = 'valueMissing';
                }
            }
        },
    });
};
