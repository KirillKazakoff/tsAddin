import { useRef } from 'react';
import { FormikProps } from 'formik';
import getErrorsDescription from '../../../components/Form/getErrorsDescription';
import { OnSubmitT } from '../../../types/typesUtils';
import { TermsT } from '../../../types/typesTables';
import portLetterStore from '../../../stores/docsStores/portLetterStore';
import { mySessionStorage } from '../../utils/sessionStorage';

export const usePortLetterFormik = () => {
    const storedValues = mySessionStorage.getItem('portLetter');
    const initialFields = storedValues || {
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
        if (!values.termsPort) errors.termsPort = 'valueMissing';

        if (!values.termsPort.includes('CFR')) {
            if (!values.storageFrom) errors.storageFrom = 'valueMissing';
            if (!values.storageTo) errors.storageTo = 'valueMissing';
        } else {
            delete errors.storageFrom;
            delete errors.storageTo;
        }

        if (values.termsPort === 'FCA') {
            delete errors.storageFrom;
            delete errors.storageTo;
            if (!values.personDischarge) errors.personDischarge = 'valueMissing';
        } else {
            delete errors.personDischarge;
        }

        mySessionStorage.setItem('portLetter', values);

        return getErrorsDescription(errors);
    };

    const onSubmit: OnSubmitT<FormValuesT> = async (values) => {
        portLetterStore.setFields(values);
    };

    const formRef = useRef<FormikProps<FormValuesT>>();

    return {
        onSubmit,
        validate,
        initialFields,
        formRef,
    };
};
