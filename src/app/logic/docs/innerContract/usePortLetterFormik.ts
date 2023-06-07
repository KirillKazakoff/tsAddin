import { useEffect, useRef } from 'react';
import { FormikProps } from 'formik';
import _ from 'lodash';
import getErrorsDescription from '../../../components/Form/getErrorsDescription';
import portLetterStore from '../../../stores/docsStores/portLetterStore';
import { OnSubmitT } from '../../../types/typesUtils';
import { TermsT } from '../../../types/typesTables';

export const usePortLetterFormik = () => {
    const initialFields = {
        dateLetter: '12.12.23',
        portRu: 'ВМРП',
        podpisant: 'Котов М.Н.',
        isPictures: true,
        termsPort: <TermsT>'FCA',
        personDischarge: 'Афанасьева В.В.',
        cargoToAuto: '',
        cargoToStorage: '',
        storageFrom: '',
        storageTo: '',
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
        console.log(_.cloneDeep(portLetterStore.fields));
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
//     portRu: '',
//     podpisant: '',
//     isPictures: false,
//     dateLetter: '',
//     termsPort: <TermsT>'',
//     cargoToAuto: '',
//     cargoToStorage: '',
//     storageFrom: '',
//     storageTo: '',
//     personDischarge: '',
// };
