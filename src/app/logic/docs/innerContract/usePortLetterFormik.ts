/* eslint-disable no-param-reassign */
import { TermsT } from '../../../types/typesTables';
import portLetterStore from '../../../stores/docsStores/portLetterStore';
import { useMyFormik } from '../../../components/Form/useMyFormik';

export const usePortLetterFormik = () => {
    return useMyFormik({
        store: portLetterStore,
        initialFields: {
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
        },
        validateCb(errors, values) {
            if (!values.portRu) errors.portRu = 'valueMissing';
            if (!values.podpisant) errors.podpisant = 'valueMissing';
            if (!values.dateLetter) errors.dateLetter = 'valueMissing';
            if (!values.termsPort) errors.termsPort = 'valueMissing';

            if (!values.termsPort || !values.termsPort.includes('CFR')) {
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
        },
    });
};
