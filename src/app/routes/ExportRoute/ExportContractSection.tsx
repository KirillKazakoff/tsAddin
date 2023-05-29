/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Formik } from 'formik';
import exportContractStore from '../../stores/docsStores/exportContractStore';
import { useInitContractSection } from '../../logic/docs/exportContract/useInitContractSection';
import { SelectPodpisant } from '../../components/Select/SelectPodpisant';
import { Doc } from '../../components/Doc';
import { ExportDateFCA } from './ExportDateFCA';
import { useExportSettings } from '../../logic/docs/exportContract/useExportSettings';

export const ExportContractSection = observer(() => {
    const initObj = useInitContractSection();
    if (!initObj) return null;
    const {
        onLoad, setField, agreements, title,
    } = initObj;

    const { initialValues, onSubmit, validate } = useExportSettings();

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
        <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={onSubmit}
        >
            <Form className='docs__form export-contract-form'>
                <h2>{title}</h2>

                <ExportDateFCA />
                <SelectPodpisant
                    current={exportContractStore.fields.podpisant.codeName}
                    setter={setField.podpisant}
                />

                <ul className='docs'>{agreementsHtml}</ul>
                <button type='submit'>fsdfsdf</button>
            </Form>
        </Formik>
    );
});
