import { FormikProps } from 'formik';
import { useRef } from 'react';
import exportContractStore from '../../../stores/docsStores/exportContractStore';
import getErrorsDescription from '../../../components/Form/getErrorsDescription';
import { OnSubmitT } from '../../../types/typesUtils';

export const useContractFormik = () => {
    const initialFields = {
        podpisant: '',
        dischargeDate: '',
        declaration: '',
    };
    type FormValuesT = typeof initialFields;

    const validate = (values: FormValuesT) => {
        const errors: { [key: string]: string } = {};

        if (!values.dischargeDate) {
            errors.dischargeDate = 'valueMissing';
        }
        if (!values.declaration) {
            errors.declaration = 'valueMissing';
        }
        if (!values.podpisant) {
            errors.podpisant = 'valueMissing';
        }

        if (exportContractStore.terms !== 'FCA') {
            delete errors.dischargeDate;
        }
        if (exportContractStore.terms !== 'EXW') {
            delete errors.declaration;
        }

        return getErrorsDescription(errors);
    };

    const onSubmit: OnSubmitT<FormValuesT> = async (values) => {
        exportContractStore.setFields(values);
    };

    const formRef = useRef<FormikProps<FormValuesT>>();

    return {
        onSubmit,
        validate,
        initialFields,
        formRef,
    };
};
