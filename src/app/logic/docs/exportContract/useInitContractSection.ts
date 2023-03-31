import { useEffect } from 'react';
import exportContractStore from '../../../stores/docsStores/exportContractStore';
import { createExportContract } from './createExportContract';
import { groupByAgreementNo, AgreementT } from './groupByAggrementNo';

export const useInitContractSection = () => {
    const agreementObj = groupByAgreementNo();
    const agreements = Object.values(agreementObj);

    const getContract = (agreement: AgreementT) => createExportContract(agreement);
    const setPodpisant = (value: string) => exportContractStore.setPodpisant(value);

    useEffect(() => {
        setPodpisant('Котов Н.М.');
        getContract(agreements[0]);
    }, []);

    return { getContract, setPodpisant, agreements };
};
