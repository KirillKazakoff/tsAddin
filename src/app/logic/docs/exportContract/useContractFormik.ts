/* eslint-disable no-param-reassign */
import { FormikProps } from 'formik';
import { useRef } from 'react';
import exportContractStore from '../../../stores/docsStores/exportContractStore';
import { getValidationError } from '../../../components/Form/getValidationError';
import { OnSubmitT } from '../../../types/typesUtils';
import { mySessionStorage } from '../../utils/sessionStorage';
import { useRevalidate } from '../../../components/Form/useRevalidate';

export const useContractFormik = () => {
    const storedValues = mySessionStorage.getItem('exportContract');
    const initialFields = {
        podpisant: '',
        departureDate: '',
        declaration: '',
    };
    type FormValuesT = typeof initialFields;

    const validate = (formValues: FormValuesT) => {
        mySessionStorage.setItem('exportContract', formValues);

        return getValidationError(formValues, (errors, values) => {
            const { currentAgreementRecord: r } = exportContractStore;

            if (!values.podpisant) {
                errors.podpisant = 'valueMissing';
            }

            if (r.terms !== 'EXW') {
                if (!values.departureDate) {
                    errors.departureDate = 'valueMissing';
                }
                if (!values.departureDate.match(/^$|^\d{2}\.\d{2}\.\d{4}$/)) {
                    errors.departureDate = 'formatMismatch';
                }
            }
            // if export exw closed
            const isEXWClosed = r.terms === 'EXW' && r.type === 'export';
            if (isEXWClosed) {
                if (!values.declaration) {
                    errors.declaration = 'valueMissing';
                }
                if (!values.declaration.match(/^$|^\d{8}\/\d{6}\/\d{7}$/)) {
                    errors.declaration = 'formatMismatch';
                }
            }
        });
    };

    const onSubmit: OnSubmitT<FormValuesT> = async (values) => {
        exportContractStore.setFields(values);
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
