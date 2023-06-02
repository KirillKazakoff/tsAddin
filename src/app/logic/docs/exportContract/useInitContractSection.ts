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
        if (!formik.formRef.current.isValid) {
            console.log(formik.formRef.current);
            throw new Error('invalid input');
        }
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
