/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Formik, FormikProps } from 'formik';
import { ExportContractForm } from './ExportContractForm';
import getErrorsDescription from '../../components/Form/getErrorsDescription';
import exportContractStore from '../../stores/docsStores/exportContractStore';
import { OnSubmitT } from '../../types/typesUtils';

export const ExportContractSection = observer(() => {
    const initialFormFields = {
        podpisant: '',
        dischargeDate: '',
    };
    type FormFieldsT = typeof initialFormFields;

    const validate = (values: FormFieldsT) => {
        const { dischargeDate, podpisant } = values;
        const errors: { [key: string]: string } = {};

        if (!dischargeDate) {
            errors.dischargeDate = 'valueMissing';
        }
        if (!podpisant) {
            errors.podpisant = 'valueMissing';
        }
        console.log(errors);
        return getErrorsDescription(errors);
    };

    const onSubmit: OnSubmitT<FormFieldsT> = async (values) => {
        exportContractStore.setField.dischargeDate(values.dischargeDate);
        exportContractStore.setField.podpisant(values.podpisant);
    };

    const formRef = useRef<FormikProps<FormFieldsT>>();
    useEffect(() => {
        formRef.current.validateForm();
    }, []);

    return (
        <Formik
            initialValues={initialFormFields}
            validate={validate}
            onSubmit={onSubmit}
            innerRef={formRef}
        >
            <Form className='docs__form export-contract-form'>
                <ExportContractForm />
            </Form>
        </Formik>
    );
});
