import React from 'react';
import { observer } from 'mobx-react-lite';
import { SelectPodpisantFormik } from '../../components/Select/SelectPodpisant';
import AgreementList from './AgreementList';
import { ExportDateFCA } from './ExportDateFCA';
import { useInitContractSection } from '../../logic/docs/exportContract/useInitContractSection';

export const ExportContractForm = observer(() => {
    const initObj = useInitContractSection();

    return (
        <>
            <h2>{initObj.title}</h2>

            <ExportDateFCA />
            <SelectPodpisantFormik />
            <AgreementList agreements={initObj.agreements} onLoad={initObj.onLoad} />

            <button type='submit'>Submit</button>
        </>
    );
});
