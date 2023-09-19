/* eslint-disable no-param-reassign */
import { useRef } from 'react';
import { FormikProps } from 'formik';
import { getValidationError } from '../../components/Form/getValidationError';
import { mySessionStorage } from '../../logic/utils/sessionStorage';
import salesContractStore from '../../stores/docsStores/salesContractStore';
import { OnSubmitT } from '../../types/typesUtils';
import { useRevalidate } from '../../components/Form/useRevalidate';

export const useSalesFormik = () => {
    const storedValues = mySessionStorage.getItem('salesContract');
    const initialFields = {
        podpisant: '',
    };
    type FormValuesT = typeof initialFields;

    const validate = (formValues: FormValuesT) => {
        mySessionStorage.setItem('salesContract', formValues);

        return getValidationError(formValues, (errors, values) => {
            if (!values.podpisant) {
                errors.podpisant = 'valueMissing';
            }
        });
    };

    const onSubmit: OnSubmitT<FormValuesT> = async (values) => {
        salesContractStore.setFields(values);
    };

    const formRef = useRef<FormikProps<FormValuesT>>();
    useRevalidate(formRef);

    return {
        onSubmit,
        validate,
        initialFields: storedValues || initialFields,
        formRef,
    };
};
