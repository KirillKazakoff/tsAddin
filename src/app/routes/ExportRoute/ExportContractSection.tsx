/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { observer } from 'mobx-react-lite';
import exportContractStore from '../../stores/docsStores/exportContractStore';
import { useInitContractSection } from '../../logic/docs/exportContract/useInitContractSection';
import { SelectPodpisant } from '../../components/Select/SelectPodpisant';
import { Doc } from '../../components/Doc';

export const ExportContractSection = observer(() => {
    const { onLoad, setPodpisant, agreements } = useInitContractSection();

    const agreementsHtml = agreements.map((agreement) => {
        const { agreementNo } = agreement.record;
        const onClick = async () => onLoad(agreement);

        return (
            <Doc
                onClick={onClick}
                title={`№ ${agreementNo}`}
                key={agreementNo}
                cls={'export-contract'}
            />
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
