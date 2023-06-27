import { FormikProps } from 'formik';
import { useRef, useEffect } from 'react';
import letterStore from '../../stores/letterStore/letterStore';
import { OnSubmitT } from '../../types/typesUtils';
import getErrorsDescription from '../../components/Form/getErrorsDescription';

export const useLetterFormik = () => {
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
        const errors: { [key: string]: string } = {};

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

        return getErrorsDescription(errors);
    };

    const onSubmit: OnSubmitT<FormValuesT> = async (values) => {
        letterStore.setFields(values);
    };

    const formRef = useRef<FormikProps<FormValuesT>>();
    useEffect(() => {
        formRef.current.validateForm();
    }, []);

    return {
        onSubmit,
        validate,
        initialFields,
        formRef,
    };
};
