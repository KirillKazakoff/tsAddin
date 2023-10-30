/* eslint-disable no-param-reassign */
import { useInitSection } from '../../components/Form/useInitSection';
import { useMyFormik } from '../../components/Form/useMyFormik';
import { createSalesContract } from '../../logic/docs/sales/createSalesContract';
import { groupSalesContract } from '../../logic/docs/sales/groupBy/groupSalesContract';
import salesContractStore from '../../stores/docsStores/salesContractStore';

export const useInitSalesSection = () => {
    const formik = useMyFormik({
        store: salesContractStore,
        initialFields: {
            isSortGroup: true,
        },
        validateCb: () => {},
    });

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
