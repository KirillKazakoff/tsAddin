import { useInitSection } from '../../../components/Form/useInitSection';
import exportContractStore from '../../../stores/docsStores/exportContractStore';
import { createExportContractDoc } from './createExportContractDoc';
import { groupAgByNo } from './groupBy/groupAgByNo';
import { useContractFormik } from './useContractFormik';

export const useInitContractSection = () => {
    const formik = useContractFormik();

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
