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
        departureDate: '',
        declaration: '',
    };
    type FormValuesT = typeof initialFields;

    const validate = (values: FormValuesT) => {
        const { terms } = exportContractStore;
        const errors: { [key: string]: string } = {};

        if (!values.podpisant) {
            errors.podpisant = 'valueMissing';
        }
        // if (!values.declaration) {
        //     errors.declaration = 'valueMissing';
        // }

        if (!terms) {
            delete errors.declaration;
            delete errors.departureDate;
        }
        if (terms && !terms.includes('CFR')) {
            delete errors.departureDate;
        }
        if (terms === 'FCA' && !values.departureDate) {
            errors.departureDate = 'valueMissing';
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
