import { createSalesContract } from '../../logic/docs/sales/createSalesContract';
import { groupSalesContract } from '../../logic/docs/sales/groupBy/groupSalesContract';
import { SalesContractT } from '../../logic/docs/sales/groupBy/initSalesContract';
import salesContractStore from '../../stores/docsStores/salesContractStore';
import { useSalesFormik } from './useSalesFormik';

export const useInitSalesSection = () => {
    const formik = useSalesFormik();
    const docs = groupSalesContract();
    const currentDoc = docs.find(
        (c) => c.record.id === salesContractStore.currentId,
    );

    const onLoad = async (doc: SalesContractT) => {
        const { isValid, values } = formik.formRef.current;
        if (!isValid) {
            console.warn(formik.formRef.current);
            throw new Error('invalid input');
        }

        await formik.onSubmit(values);
        await createSalesContract(doc);
    };
    const onLoadHandler = async () => onLoad(currentDoc);

    const title = `Контракт №${currentDoc?.record?.id}`;

    const initObj = {
        onLoad: onLoadHandler,
        docs,
        title,
        currentDoc,
    };

    return {
        initObj,
        formik,
    };
};
