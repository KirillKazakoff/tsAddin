import { useInitSection } from '../../components/Form/useInitSection';
import excelSyncStore from '../../stores/excelSyncStore.ts/excelSyncStore';
import letterStore from '../../stores/letterStore/letterStore';
import { getHref } from './getHref';
import { useLetterFormik } from './useLetterFormik';

export const useInitLetter = () => {
    const formik = useLetterFormik();
    return useInitSection({
        store: letterStore as any,
        getSettings: () => ({
            formik,
            loadCb: async () => {
                const href = getHref();
                document.location.href = href;
                // refresh stores
                excelSyncStore.setSync(false);
            },
        }),
    });
};
