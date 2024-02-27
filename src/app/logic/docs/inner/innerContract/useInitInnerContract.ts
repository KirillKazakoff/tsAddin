/* eslint-disable no-param-reassign */
import { useInitSection } from '../../../../components/Form/useInitSection';
import { useMyFormik } from '../../../../components/Form/useMyFormik';
import innerContractStore from '../../../../stores/docsStores/innerContractStore';
import { groupInnerContracts } from '../groupInnerContracts';
import { createInnerContract } from './createInnerContract';

export const useInitInnerContract = () => {
    const formik = useMyFormik({
        store: innerContractStore,
        initialFields: {
            podpisant: '',
        },
        validateCb: (errors, values) => {
            if (!values.podpisant) {
                errors.podpisant = 'valueMissing';
            }
        },
    });

    return useInitSection({
        store: innerContractStore as any,
        docs: groupInnerContracts(),
        getSettings: () => ({
            formik,
            loadCb: createInnerContract,
        }),
    });
};
