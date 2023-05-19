import { useEffect } from 'react';
import exportContractStore from '../../../stores/docsStores/exportContractStore';
import { createExportContractDoc } from './createExportContractDoc';
import { groupAgByNo } from './groupBy/groupAgByNo';
import { AgreementT } from './groupBy/initAgreement';

export const useInitContractSection = () => {
    const agreementObj = groupAgByNo();
    const agreements = Object.values(agreementObj);
    const { setField } = exportContractStore;

    const onLoad = async (agreement: AgreementT) => createExportContractDoc(agreement);

    useEffect(() => {
        setField.podpisant('Котов Н.М.');
        // (for debug)
        // onLoad(agreements[0]);
    }, []);

    return { onLoad, setField, agreements };
};
