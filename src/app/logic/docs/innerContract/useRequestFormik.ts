import { FormikProps } from 'formik';
import { useRef, useEffect } from 'react';
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
        requestContractStore.setField.terms(values.portRu);
        requestContractStore.setField.portTamozhnya(values.portRu);
        requestContractStore.setField.portRu(values.portRu);
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
