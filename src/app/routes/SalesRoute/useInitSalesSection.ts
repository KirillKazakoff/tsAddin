import { useInitSection } from '../../components/Form/useInitSection';
import { createSalesContract } from '../../logic/docs/sales/createSalesContract';
import { groupSalesContract } from '../../logic/docs/sales/groupBy/groupSalesContract';
import salesContractStore from '../../stores/docsStores/salesContractStore';
import { useSalesFormik } from './useSalesFormik';

export const useInitSalesSection = () => {
    const formik = useSalesFormik();

    return useInitSection({
        store: salesContractStore,
        docs: groupSalesContract(),
        getSettings: (currentDoc) => ({
            formik,
            loadCb: async () => createSalesContract(currentDoc),
            title: `Контракт №${currentDoc?.record?.id}`,
        }),
    });
};
