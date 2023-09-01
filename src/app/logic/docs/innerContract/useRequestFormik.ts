/* eslint-disable no-param-reassign */
import { FormikProps } from 'formik';
import { useRef } from 'react';
import { getValidationError } from '../../../components/Form/getValidationError';
import requestContractStore from '../../../stores/docsStores/requestContractStore';
import { OnSubmitT } from '../../../types/typesUtils';
import { mySessionStorage } from '../../utils/sessionStorage';
import { useRevalidate } from '../../../components/Form/useRevalidate';

export const useRequestFormik = () => {
    const storedValues = mySessionStorage.getItem('request');
    const initialFields = {
        isInvoiceOnly: false,
        reiceNo: '',
        terms: '',
        portTamozhnya: '',
        portRu: '',
    };

    type FormValuesT = typeof initialFields;

    const validate = (values: FormValuesT) => {
        mySessionStorage.setItem('request', values);

        return getValidationError((errors) => {
            if (!values.terms) {
                errors.terms = 'valueMissing';
            }
            if (!values.portTamozhnya) {
                errors.portTamozhnya = 'valueMissing';
            }
            if (!values.portRu) {
                errors.portRu = 'valueMissing';
            }
        });
    };

    const onSubmit: OnSubmitT<FormValuesT> = async (values) => {
        requestContractStore.setFields(values);
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
