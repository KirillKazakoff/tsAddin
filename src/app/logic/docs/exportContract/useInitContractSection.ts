import exportContractStore from '../../../stores/docsStores/exportContractStore';
import { createExportContractDoc } from './createExportContractDoc';
import { groupAgByNo } from './groupBy/groupAgByNo';
import { AgreementT } from './groupBy/initAgreement';

export const useInitContractSection = (formik: any) => {
    const agreementObj = groupAgByNo();
    const agreements = Object.values(agreementObj);

    const onLoad = async (agreement: AgreementT) => {
        if (!formik.current.isValid) {
            throw new Error('invalid input');
        }
        await createExportContractDoc(agreement);
    };

    const title = exportContractStore.terms === 'FCA'
        ? 'Экспорт Контракт(FCA)'
        : 'Экспорт Контракт';

    return {
        onLoad,
        agreements,
        title,
    };
};
