/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Formik } from 'formik';
import exportContractStore from '../../stores/docsStores/exportContractStore';
import { useInitContractSection } from '../../logic/docs/exportContract/useInitContractSection';
import { SelectPodpisant } from '../../components/Select/SelectPodpisant';
import { ExportDateFCA } from './ExportDateFCA';
import { useContractFormik } from '../../logic/docs/exportContract/useContractFormik';
import AgreementList from './AgreementList';

export const ExportContractSection = observer(() => {
    const initObj = useInitContractSection();
    const formik = useContractFormik(initObj);
    const { setField, fields } = exportContractStore;

    return (
        <Formik
            initialValues={formik.fields}
            validate={formik.validate}
            onSubmit={formik.onSubmit}
        >
            <Form className='docs__form export-contract-form'>
                <h2>{initObj.title}</h2>

                <ExportDateFCA />
                <SelectPodpisant
                    current={fields.podpisant.codeName}
                    setter={setField.podpisant}
                />
                <AgreementList
                    agreements={initObj.agreements}
                    onLoad={initObj.onLoad}
                />

                <button type='submit'>Submit</button>
            </Form>
        </Formik>
    );
});
