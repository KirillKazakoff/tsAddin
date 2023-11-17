/* eslint-disable no-param-reassign */
import { useInitSection } from '../../../components/Form/useInitSection';
import { useMyFormik } from '../../../components/Form/useMyFormik';
import exportContractStore from '../../../stores/docsStores/exportContractStore';
import { createExportContractDoc } from './createExportContractDoc';
import { groupAgByNo } from './groupBy/groupAgByNo';

export const useInitContractSection = () => {
    const formik = useMyFormik({
        store: exportContractStore,
        initialFields: {
            podpisant: '',
            departureDate: '',
            declaration: '',
            isPictures: false,
        },
        validateCb: (errors, values) => {
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
        },
    });

    return useInitSection({
        store: exportContractStore,
        docs: groupAgByNo(),
        getSettings: (currentDoc) => {
            return {
                formik,
                loadCb: async () => {
                    await createExportContractDoc(currentDoc);
                    if (exportContractStore.currentTerms === 'EXW') {
                        formik.formRef.current.setFieldValue('declaration', '');
                    }
                },
                title: `Контракт №${currentDoc?.record?.id}`,
            };
        },
    });
};
