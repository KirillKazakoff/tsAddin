import { useEffect, useRef } from 'react';
import { FormikProps } from 'formik';
import getErrorsDescription from '../../../components/Form/getErrorsDescription';
import portLetterStore, { CargoT } from '../../../stores/docsStores/portLetterStore';
import { OnSubmitT } from '../../../types/typesUtils';

export const usePortLetterFormik = () => {
    const initialFields = {
        portRu: '',
        podpisant: '',
        pictures: false,
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
        if (!values.dateLetter) errors.dsateLetter = 'valueMissing';

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
        portLetterStore.setField.port(values.portRu);
        portLetterStore.setField.podpisant(values.podpisant);
        portLetterStore.setField.dateLetter(values.dateLetter);
        portLetterStore.setField.storage.from(values.storageFrom);
        portLetterStore.setField.storage.to(values.storageFrom);
        portLetterStore.setField.cargoTo.auto(values.cargoToAuto as CargoT);
        portLetterStore.setField.cargoTo.storage(values.cargoToStorage as CargoT);
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

// const initialFields = {
//     portRu: 'ВМРП',
//     podpisant: 'Котов М.Н.',
//     pictures: false,
//     cargoToAuto: '',
//     cargoToStorage: '',
//     isCFR: true,
//     dateLetter: '1232321',
//     storageFrom: '',
//     storageTo: '',
// };
