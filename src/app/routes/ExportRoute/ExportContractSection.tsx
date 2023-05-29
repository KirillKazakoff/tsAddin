/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { observer } from 'mobx-react-lite';
import exportContractStore from '../../stores/docsStores/exportContractStore';
import { useInitContractSection } from '../../logic/docs/exportContract/useInitContractSection';
import { SelectPodpisant } from '../../components/Select/SelectPodpisant';
import { Doc } from '../../components/Doc';
import { ExportDateFCA } from './ExportDateFCA';

export const ExportContractSection = observer(() => {
    const initObj = useInitContractSection();
    if (!initObj) return null;
    const {
        onLoad, setField, agreements, title,
    } = initObj;

    const agreementsHtml = agreements.map((agreement) => {
        const { id } = agreement.record;
        const onClick = async () => onLoad(agreement);

        return (
            <Doc
                onClick={onClick}
                title={`№ ${id}`}
                key={id}
                cls={'export-contract'}
            />
        );
    });

    return (
        <form className='docs__form export-contract-form'>
            <h2>{title}</h2>

            <ExportDateFCA />
            <SelectPodpisant
                current={exportContractStore.podpisant.codeName}
                setter={setField.podpisant}
            />

            <ul className='docs'>{agreementsHtml}</ul>
        </form>
    );
});
