import { useFormikContext } from 'formik';
import exportContractStore from '../../../stores/docsStores/exportContractStore';
import { createExportContractDoc } from './createExportContractDoc';
import { groupAgByNo } from './groupBy/groupAgByNo';
import { AgreementT } from './groupBy/initAgreement';

export const useInitContractSection = () => {
    const agreementObj = groupAgByNo();
    const agreements = Object.values(agreementObj);
    const { setField, fields } = exportContractStore;

    type FormValues = typeof fields;
    const context = useFormikContext<FormValues>();

    const onLoad = async (agreement: AgreementT) => {
        if (!context.isValid) {
            throw new Error('invalid input');
        }
        createExportContractDoc(agreement);
    };

    const title = exportContractStore.terms === 'FCA'
        ? 'Экспорт Контракт(FCA)'
        : 'Экспорт Контракт';

    return {
        onLoad,
        setField,
        agreements,
        title,
    };
};
