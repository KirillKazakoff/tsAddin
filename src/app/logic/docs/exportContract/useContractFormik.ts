import { FormikProps } from 'formik';
import { useRef } from 'react';
import exportContractStore from '../../../stores/docsStores/exportContractStore';
import getErrorsDescription from '../../../components/Form/getErrorsDescription';
import { OnSubmitT } from '../../../types/typesUtils';
import { mySessionStorage } from '../../utils/sessionStorage';

export const useContractFormik = () => {
    const storedValues = mySessionStorage.getItem('exportContract');
    const initialFields = storedValues || {
        podpisant: '',
        dischargeDate: '',
        departureDate: '',
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
        if (!values.departureDate) {
            errors.departureDate = 'valueMissing';
        }

        if (exportContractStore.terms) {
            if (exportContractStore.terms !== 'FCA') {
                delete errors.dischargeDate;
            }
            if (!exportContractStore.terms.includes('CFR')) {
                delete errors.departureDate;
            }
        }
        if (exportContractStore.terms !== 'EXW') {
            delete errors.declaration;
        }

        mySessionStorage.setItem('exportContract', values);

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
