import { useEffect, useRef } from 'react';
import { FormikProps } from 'formik';
import getErrorsDescription from '../../../components/Form/getErrorsDescription';
import { OnSubmitT } from '../../../types/typesUtils';
import { TermsT } from '../../../types/typesTables';
import portLetterStore from '../../../stores/docsStores/portLetterStore';
import { debugPortLetter } from '../../../stores/tablesStore/utils/debug';

export const usePortLetterFormik = () => {
    // const initialFields = debugPortLetter;
    const initialFields = {
        dateLetter: '',
        portRu: '',
        podpisant: '',
        termsPort: <TermsT>'',
        isPictures: true,
        cargoToAuto: '',
        cargoToStorage: '',
        storageFrom: '',
        storageTo: '',
        personDischarge: '',
    };

    type FormValuesT = typeof initialFields;

    const validate = (values: FormValuesT) => {
        const errors: { [key: string]: string } = {};

        if (!values.portRu) errors.portRu = 'valueMissing';
        if (!values.podpisant) errors.podpisant = 'valueMissing';
        if (!values.dateLetter) errors.dateLetter = 'valueMissing';

        if (!values.termsPort) {
            errors.terms = 'valueMissing';
        }

        if (!values.termsPort.includes('CFR')) {
            if (!values.storageFrom) errors.storageFrom = 'valueMissing';
            if (!values.storageTo) errors.storageTo = 'valueMissing';
        } else if (values.termsPort.includes('CFR')) {
            delete errors.storageFrom;
            delete errors.storageTo;
        }

        if (values.termsPort === 'FCA') {
            delete errors.cargoToAuto;
            delete errors.cargoToStorage;
            delete errors.storageFrom;
            delete errors.storageTo;
            if (!values.personDischarge) errors.personDischarge = 'valueMissing';
        } else {
            delete errors.personDischarge;
        }

        return getErrorsDescription(errors);
    };

    const onSubmit: OnSubmitT<FormValuesT> = async (values) => {
        portLetterStore.setFields(values);
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
