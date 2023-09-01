/* eslint-disable no-param-reassign */
import { FormikProps } from 'formik';
import { useRef } from 'react';
import letterStore from '../../stores/letterStore/letterStore';
import { OnSubmitT } from '../../types/typesUtils';
import { getValidationError } from '../../components/Form/getValidationError';
import { mySessionStorage } from '../utils/sessionStorage';
import { useRevalidate } from '../../components/Form/useRevalidate';

export const useLetterFormik = () => {
    const storedValues = mySessionStorage.getItem('letter');
    const initialFields = {
        port: '',
        arrivalVld: '',
        payment: '',
        isExport: false,
        arrivalForeign: '',
        terms: '',
        ground: '',
    };

    type FormValuesT = typeof initialFields;

    const validate = (values: FormValuesT) => {
        mySessionStorage.setItem('letter', values);

        return getValidationError((errors) => {
            if (!values.port) errors.port = 'valueMissing';
            if (!values.arrivalVld) errors.arrivalVld = 'valueMissing';
            if (!values.payment) errors.payment = 'valueMissing';
            if (values.isExport) {
                if (!values.arrivalForeign) errors.arrivalForeign = 'valueMissing';
                if (!values.terms) errors.terms = 'valueMissing';
                if (!values.ground) errors.ground = 'valueMissing';
            } else if (!values.isExport) {
                delete errors.arrivalForeign;
                delete errors.terms;
                delete errors.ground;
            }
        });
    };

    const onSubmit: OnSubmitT<FormValuesT> = async (values) => {
        letterStore.setFields(values);
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
