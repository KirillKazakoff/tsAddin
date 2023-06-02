import { useEffect, useRef } from 'react';
import { FormikProps } from 'formik';
import getErrorsDescription from '../../../components/Form/getErrorsDescription';
import portLetterStore from '../../../stores/docsStores/portLetterStore';
import { OnSubmitT } from '../../../types/typesUtils';

export const usePortLetterFormik = () => {
    const initialFields = {
        portRu: '',
        podpisant: '',
        isPictures: false,
        dateLetter: '',
        cargoToAuto: '',
        cargoToStorage: '',
        isCFR: false,
        storageFrom: '',
        storageTo: '',
    };

    type FormValuesT = typeof initialFields;

    const validate = (values: FormValuesT) => {
        const errors: { [key: string]: string } = {};

        if (!values.portRu) errors.portRu = 'valueMissing';
        if (!values.podpisant) errors.podpisant = 'valueMissing';
        if (!values.dateLetter) errors.dateLetter = 'valueMissing';

        if (!values.isCFR) {
            if (!values.storageFrom) errors.storageFrom = 'valueMissing';
            if (!values.storageTo) errors.storageTo = 'valueMissing';
        } else if (values.isCFR) {
            delete errors.storageFrom;
            delete errors.storageTo;
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
