import { FormikProps } from 'formik';
import { useRef } from 'react';
import { OnSubmitT } from '../../types/typesUtils';
import { useRevalidate } from './useRevalidate';
import { ErrorsT, getValidationError } from './getValidationError';
import { mySessionStorage } from '../../logic/utils/sessionStorage';

type SettingsT<FormValuesT> = {
    initialFields: FormValuesT;
    store: unknown & { name: string; setFields: (values: FormValuesT) => void };
    validateCb: (errors: ErrorsT<FormValuesT>, valuesTrimed: FormValuesT) => void;
};

export const useMyFormik = <FormValuesT>(settings: SettingsT<FormValuesT>) => {
    const { initialFields, store, validateCb } = settings;

    const storedValues = mySessionStorage.getItem(store.name);

    const validate = (formValues: FormValuesT) => {
        mySessionStorage.setItem(store.name, formValues);
        return getValidationError(formValues, validateCb);
    };

    const onSubmit: OnSubmitT<FormValuesT> = async (values) => {
        store.setFields(values);
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
