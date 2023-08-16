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
        const { currentTerms: terms } = exportContractStore;
        const errors: { [key: string]: string } = {};

        if (!values.podpisant) {
            errors.podpisant = 'valueMissing';
        }
        if ((terms === 'FCA' || terms.includes('CFR')) && !values.departureDate) {
            errors.departureDate = 'valueMissing';
        }
        // if export exw closed
        const isEXWClosed = exportContractStore.currentAgreementRecord.terms === 'EXW';
        if (isEXWClosed && !values.declaration) {
            errors.declaration = 'valueMissing';
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
