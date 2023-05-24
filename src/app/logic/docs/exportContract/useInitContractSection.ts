import { useEffect } from 'react';
import exportContractStore from '../../../stores/docsStores/exportContractStore';
import { createExportContractDoc } from './createExportContractDoc';
import { groupAgByNo } from './groupBy/groupAgByNo';
import { AgreementT } from './groupBy/initAgreement';
import { tryCatch } from '../../excel/utils/tryCatch';

export const initContractSection = () => {
    const agreementObj = groupAgByNo();
    const agreements = Object.values(agreementObj);
    const { setField } = exportContractStore;

    const onLoad = async (agreement: AgreementT) => createExportContractDoc(agreement);

    return { onLoad, setField, agreements };
};

export const useInitContractSection = () => {
    const initObj = tryCatch<typeof initContractSection>(initContractSection);
    useEffect(() => {
        exportContractStore.setField.podpisant('Котов Н.М.');
    }, []);

    return initObj;
};
