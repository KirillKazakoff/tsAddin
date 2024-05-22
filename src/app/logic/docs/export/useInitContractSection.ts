/* eslint-disable no-param-reassign */
import { useInitSection } from '../../../components/Form/useInitSection';
import { useMyFormik } from '../../../components/Form/useMyFormik';
import exportContractStore from '../../../stores/docsStores/exportContractStore';
import { PathKeyT } from '../../utils/constants';
import { groupAgByNo } from './groupAgByNo';
import { initExportInvoicesTmps } from './invoicesTmps/initExportInvoicesTmps';
import { initExportContractTmp } from './сontractTmp/initExportContractTmp';

export const useInitContractSection = () => {
    const formik = useMyFormik({
        store: exportContractStore,
        initialFields: {
            podpisant: '',
            departureDate: '',
            isNonComFCA: false,
            isPictures: false,
        },
        validateCb: (errors, values) => {
            if (!values.podpisant) {
                errors.podpisant = 'valueMissing';
            }
            if (exportContractStore.currentTerms === 'FCA' && !values.departureDate) {
                errors.departureDate = 'valueMissing';
            }
        },
    });

    return useInitSection({
        store: exportContractStore,
        docs: groupAgByNo(),
        getSettings: (current) => {
            return {
                formik,
                createDoc: () => {
                    const { invoices } = current.groupedBy;
                    const { operation } = exportContractStore;
                    const { agreementNo, id } = current.record;

                    let tmpPath: PathKeyT = operation === 'export'
                        ? 'exportContract'
                        : 'exportStorageContract';

                    if (current.record.terms === 'FCA') tmpPath = 'exportContractFCA';

                    return {
                        fileName: `Доп №${agreementNo} (${id})`,
                        initTmpsCb: async (book) => {
                            await initExportInvoicesTmps(book, invoices);
                            await initExportContractTmp(book, current);

                            if (exportContractStore.currentTerms === 'EXW') {
                                formik.formRef.current.setFieldValue('declaration', '');
                            }
                        },
                        tmpPath,
                    };
                },
                title: `Контракт №${current?.record?.id}`,
            };
        },
    });
};
