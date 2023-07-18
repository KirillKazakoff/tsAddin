import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Formik } from 'formik';

// import _ from 'lodash';
import { SelectPodpisant } from '../../components/Select/SelectPodpisant';
import AgreementList from './AgreementList';
import { ExportDateCFR, ExportDateFCA } from './ExportDate';
import { useInitContractSection } from '../../logic/docs/exportContract/useInitContractSection';
import { ExportDeclarationEXW } from './ExportDeclarationEXW';
// import tablesStore from '../../stores/tablesStore/tablesStore';

export const ExportContractSection = observer(() => {
    const { formik, initObj } = useInitContractSection();

    // useEffect(() => {
    // console.log('updated');
    // console.log(_.cloneDeep(tablesStore));
    // }, [tablesStore]);

    return (
        <Formik
            initialValues={formik.initialFields}
            validate={formik.validate}
            onSubmit={formik.onSubmit}
            innerRef={formik.formRef}
            validateOnMount
        >
            <Form className='docs__form export-contract-form'>
                <h2>{initObj.title}</h2>

                <ExportDateFCA />
                <ExportDateCFR />
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
