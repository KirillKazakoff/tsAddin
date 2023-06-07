import excelSyncStore from '../../stores/excelSyncStore.ts/excelSyncStore';
import { getHref } from './getHref';
import { useLetterFormik } from './useLetterFormik';

export const useInitLetter = () => {
    const formik = useLetterFormik();

    const onSubmit = async () => {
        if (!formik.formRef.current.isValid) {
            throw new Error('invalid input!');
        }

        await formik.onSubmit(formik.formRef.current.values);

        const href = getHref();
        document.location.href = href;
        // refresh stores
        excelSyncStore.setSync(false);
    };

    return { onSubmit, formik };
};
