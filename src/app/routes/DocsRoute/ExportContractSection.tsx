/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { createExportContract } from '../../logic/docs/exportContract/createExportContract';
import { SelectPodpisant } from '../../components/SelectPodpisant';
import exportContractStore from '../../stores/docsStores/exportContractStore';
import { groupByAgreementNo } from '../../logic/docs/exportContract/groupByAggrementNo';

export const ExportContractSection = observer(() => {
    const agreementObj = groupByAgreementNo();
    const agreementFirst = Object.values(agreementObj)[0];

    const getContract = () => createExportContract(agreementFirst);
    const setPodpisant = (value: string) => exportContractStore.setPodpisant(value);

    useEffect(() => {
        setPodpisant('Котов Н.М.');
        getContract();
    }, [getContract]);

    return (
        <section className='export-contract'>
            <h2>Export Contract Section</h2>

            <form className='export-contract-section'>
                <SelectPodpisant
                    current={exportContractStore.podpisant.name}
                    setter={setPodpisant}
                />
            </form>

            <button
                onClick={getContract} className='doc-link'
                type='button'
            >
                get all export contracts
            </button>
        </section>
    );
});
