/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { observer } from 'mobx-react-lite';
import exportContractStore from '../../stores/docsStores/exportContractStore';
import { useInitContractSection } from '../../logic/docs/exportContract/useInitContractSection';
import { SelectPodpisant } from '../../components/Select/SelectPodpisant';

export const ExportContractSection = observer(() => {
    const { getContract, setPodpisant, agreements } = useInitContractSection();

    const agreementsHtml = agreements.map((agreement) => {
        const { agreementNo } = agreement.record;
        const onClick = () => getContract(agreement);

        return (
            <li
                key={agreementNo}
                onClick={onClick}
                className='doc-link export-contract'
            >
                {`№ ${agreementNo}`}
            </li>
        );
    });

    return (
        <form className='docs__form export-contract-form'>
            <h2>Export Contract Section</h2>

            <SelectPodpisant
                current={exportContractStore.podpisant.codeName}
                setter={setPodpisant}
            />

            <ul className='docs'>{agreementsHtml}</ul>
        </form>
    );
});
