import { useInitSection } from '../../../components/Form/useInitSection';
import portLetterStore from '../../../stores/docsStores/portLetterStore';
import { createPortLetter } from './createPortLetter';
import { groupByContractNo } from './groupByContractNo';
import { usePortLetterFormik } from './usePortLetterFormik';

export const useInitPortLetter = () => {
    const formik = usePortLetterFormik();

    return useInitSection({
        store: portLetterStore as any,
        docs: Object.values(groupByContractNo()),
        getSettings: () => ({
            formik,
            loadCb: createPortLetter,
        }),
    });
};
