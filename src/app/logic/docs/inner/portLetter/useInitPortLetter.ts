/* eslint-disable no-param-reassign */
import { useInitSection } from '../../../../components/Form/useInitSection';
import { useMyFormik } from '../../../../components/Form/useMyFormik';
import portLetterStore from '../../../../stores/docsStores/portLetterStore';
import { TermsT } from '../../../../types/typesTables';
import { createPortLetter } from './createPortLetter';
import { groupByContractNo } from '../groupByContractNo';

export const useInitPortLetter = () => {
    const formik = useMyFormik({
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
            isControlPhone: false,
            isGroupingKns: false,
            correctedNo: '',
        },
        validateCb(errors, values) {
            if (!values.portRu) errors.portRu = 'valueMissing';
            if (!values.podpisant) errors.podpisant = 'valueMissing';
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

    return useInitSection({
        store: portLetterStore as any,
        docs: Object.values(groupByContractNo()),
        getSettings: () => ({
            formik,
            loadCb: createPortLetter,
        }),
    });
};
