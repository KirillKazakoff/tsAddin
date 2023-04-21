import { useEffect } from 'react';
import exportContractStore from '../../../stores/docsStores/exportContractStore';
import { createExportContractDoc } from './createExportContractDoc';
import { groupByAgreementNo } from './groupBy/groupByAggrementNo';
import { AgreementT } from './groupBy/initAgreement';

export const useInitContractSection = () => {
    const agreementObj = groupByAgreementNo();
    const agreements = Object.values(agreementObj);

    const onLoad = async (agreement: AgreementT) => createExportContractDoc(agreement);
    const setPodpisant = (value: string) => exportContractStore.setPodpisant(value);

    useEffect(() => {
        setPodpisant('Котов Н.М.');
        // onLoad(agreements[0]);
    }, []);

    return { onLoad, setPodpisant, agreements };
};
