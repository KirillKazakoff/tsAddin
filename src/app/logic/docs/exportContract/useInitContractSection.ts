import { useEffect } from 'react';
import exportContractStore from '../../../stores/docsStores/exportContractStore';
import { createExportContractDoc } from './createExportContractDoc';
import { groupByAgreementNo } from './groupBy/groupByAggrementNo';
import { AgreementT } from './groupBy/initAgreement';

export const useInitContractSection = () => {
    const agreementObj = groupByAgreementNo();
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
