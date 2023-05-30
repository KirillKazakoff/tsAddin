import { FormikProps } from 'formik';
import { useRef, useEffect } from 'react';
import exportContractStore from '../../../stores/docsStores/exportContractStore';
import getErrorsDescription from '../../../components/Form/getErrorsDescription';
import { OnSubmitT } from '../../../types/typesUtils';

export const useContractFormik = () => {
    const initialFields = {
        podpisant: '',
        dischargeDate: '',
    };
    type FormValuesT = typeof initialFields;

    const validate = (values: FormValuesT) => {
        const errors: { [key: string]: string } = {};

        if (!values.dischargeDate) {
            errors.dischargeDate = 'valueMissing';
        }
        if (!values.podpisant) {
            errors.podpisant = 'valueMissing';
        }

        return getErrorsDescription(errors);
    };

    const onSubmit: OnSubmitT<FormValuesT> = async (values) => {
        exportContractStore.setField.dischargeDate(values.dischargeDate);
        exportContractStore.setField.podpisant(values.podpisant);
    };

    const formRef = useRef<FormikProps<FormValuesT>>();
    useEffect(() => {
        formRef.current.validateForm();
    }, []);

    return {
        onSubmit, validate, initialFields, formRef,
    };
};
