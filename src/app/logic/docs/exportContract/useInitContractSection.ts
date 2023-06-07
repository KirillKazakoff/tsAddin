import exportContractStore from '../../../stores/docsStores/exportContractStore';
import { createExportContractDoc } from './createExportContractDoc';
import { groupAgByNo } from './groupBy/groupAgByNo';
import { AgreementT } from './groupBy/initAgreement';
import { useContractFormik } from './useContractFormik';

export const useInitContractSection = () => {
    const formik = useContractFormik();
    const agreementObj = groupAgByNo();
    const agreements = Object.values(agreementObj);

    const onLoad = async (agreement: AgreementT) => {
        const { isValid, values } = formik.formRef.current;
        if (!isValid) {
            console.log(formik.formRef.current);
            throw new Error('invalid input');
        }

        await formik.onSubmit(values);
        await createExportContractDoc(agreement);
    };

    const title = exportContractStore.terms === 'FCA'
        ? 'Экспорт Контракт(FCA)'
        : 'Экспорт Контракт';

    const initObj = { onLoad, agreements, title };
    return {
        initObj,
        formik,
    };
};
