import exportContractStore from '../../../stores/docsStores/exportContractStore';
import { createExportContractDoc } from './createExportContractDoc';
import { groupAgByNo } from './groupBy/groupAgByNo';
import { AgreementT } from './groupBy/initAgreement';
import { useContractFormik } from './useContractFormik';

export const useInitContractSection = () => {
    const formik = useContractFormik();
    const agreementObj = groupAgByNo();
    const agreements = Object.values(agreementObj);
    const currentAgreement = agreements.find(
        (a) => a.record.id === exportContractStore.agreementId,
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
    const onLoadHandler = async () => onLoad(currentAgreement);

    const title = `Контракт №${currentAgreement?.record?.id}`;

    const initObj = {
        onLoad: onLoadHandler,
        agreements,
        title,
        currentAgreement,
    };
    return {
        initObj,
        formik,
    };
};
