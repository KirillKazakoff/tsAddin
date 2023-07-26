import { FormikProps } from 'formik';
import { useRef } from 'react';
import getErrorsDescription from '../../../components/Form/getErrorsDescription';
import requestContractStore from '../../../stores/docsStores/requestContractStore';
import { OnSubmitT } from '../../../types/typesUtils';
import { mySessionStorage } from '../../utils/sessionStorage';

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

        mySessionStorage.setItem('request', values);
        return getErrorsDescription(errors);
    };

    const onSubmit: OnSubmitT<FormValuesT> = async (values) => {
        requestContractStore.setFields(values);
    };

    const formRef = useRef<FormikProps<FormValuesT>>();

    return {
        onSubmit,
        validate,
        initialFields: storedValues || initialFields,
        formRef,
    };
};
