/* eslint-disable no-param-reassign */
import { useInitSection } from '../../../../components/Form/useInitSection';
import { useMyFormik } from '../../../../components/Form/useMyFormik';
import portLetterStore from '../../../../stores/docsStores/portLetterStore';
import { TermsT } from '../../../../types/typesTables';
import { groupInnerContracts } from '../groupInnerContracts';
import { initPortLetterTmp } from './initPortLetterTmp';

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
            executive: 'МСФ',
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
        docs: groupInnerContracts(),
        getSettings: () => ({
            formik,
            createDoc: (doc) => {
                const { row } = doc.record;

                return {
                    tmpPath: 'portLetter',
                    initTmpsCb: async (book) => initPortLetterTmp(book, doc),
                    fileName: `Письмо №${row.id} ${
                        row.type === 'innerT'
                            ? row.buyer.code
                            : `${row.seller.code} Образец`
                    }`,
                };
            },
        }),
    });
};
