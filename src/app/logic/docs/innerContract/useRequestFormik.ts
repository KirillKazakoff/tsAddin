import { FormikProps } from 'formik';
import { useRef } from 'react';
import getErrorsDescription from '../../../components/Form/getErrorsDescription';
import requestContractStore from '../../../stores/docsStores/requestContractStore';
import { OnSubmitT } from '../../../types/typesUtils';

export const useRequestFormik = () => {
    const initialFields = {
        terms: '',
        portTamozhnya: '',
        portRu: '',
    };
    type FormValuesT = typeof initialFields;

    const validate = (values: FormValuesT) => {
        const errors: { [key: string]: string } = {};

        if (!values.terms) {
            errors.terms = 'valueMissing';
        }
        if (!values.portTamozhnya) {
            errors.portTamozhnya = 'valueMissing';
        }
        if (!values.portRu) {
            errors.portRu = 'valueMissing';
        }

        return getErrorsDescription(errors);
    };

    const onSubmit: OnSubmitT<FormValuesT> = async (values) => {
        requestContractStore.setFields(values);
    };

    const formRef = useRef<FormikProps<FormValuesT>>();

    return {
        onSubmit,
        validate,
        initialFields,
        formRef,
    };
};
