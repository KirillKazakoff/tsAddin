import { useInitSection } from '../../../components/Form/useInitSection';
import requestContractStore from '../../../stores/docsStores/requestContractStore';
import { createRequestContract } from './createRequestContract';
import { groupByContractNo } from './groupByContractNo';
import { useRequestFormik } from './useRequestFormik';

export const useInitRequestSection = () => {
    const formik = useRequestFormik();

    return useInitSection({
        store: requestContractStore as any,
        docs: Object.values(groupByContractNo()),
        getSettings: () => ({
            formik,
            loadCb: createRequestContract,
        }),
    });
};
