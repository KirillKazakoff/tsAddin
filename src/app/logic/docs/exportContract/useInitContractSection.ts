import exportContractStore from '../../../stores/docsStores/exportContractStore';
import { createExportContractDoc } from './createExportContractDoc';
import { groupAgByNo } from './groupBy/groupAgByNo';
import { AgreementT } from './groupBy/initAgreement';
import { useContractFormik } from './useContractFormik';

export const useInitContractSection = () => {
    const formik = useContractFormik();
    const agreementObj = groupAgByNo();
    const docs = Object.values(agreementObj);
    const currentDoc = docs.find(
        (a) => a.record.id === exportContractStore.currentId,
    );

    const onLoad = async (agreement: AgreementT) => {
        const { isValid, values } = formik.formRef.current;
        if (!isValid) {
            // eslint-disable-next-line no-console
            console.warn(formik.formRef.current);
            throw new Error('invalid input');
        }

        await formik.onSubmit(values);
        await createExportContractDoc(agreement);

        if (exportContractStore.currentTerms === 'EXW') {
            formik.formRef.current.setFieldValue('declaration', '');
        }
    };
    const onLoadHandler = async () => onLoad(currentDoc);

    const title = `Контракт №${currentDoc?.record?.id}`;

    const initObj = {
        onLoad: onLoadHandler,
        agreements: docs,
        title,
        currentDoc,
    };

    return { initObj, formik };
};
