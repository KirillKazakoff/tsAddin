/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Formik } from 'formik';
import { SelectPodpisant } from '../../components/Select/SelectPodpisant';
import AgreementList from './AgreementList';
import { ExportDateFCA } from './ExportDateFCA';
import { useInitContractSection } from '../../logic/docs/exportContract/useInitContractSection';
import { ExportDeclarationEXW } from './ExportDeclarationEXW';

export const ExportContractSection = observer(() => {
    const { formik, initObj } = useInitContractSection();

    return (
        <Formik
            initialValues={formik.initialFields}
            validate={formik.validate}
            onSubmit={formik.onSubmit}
            innerRef={formik.formRef}
        >
            <Form className='docs__form export-contract-form'>
                <h2>{initObj.title}</h2>

                <ExportDateFCA />
                <SelectPodpisant />
                <ExportDeclarationEXW />
                <AgreementList
                    agreements={initObj.agreements}
                    onLoad={initObj.onLoad}
                />
            </Form>
        </Formik>
    );
});
