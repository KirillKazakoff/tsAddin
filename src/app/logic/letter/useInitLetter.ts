import excelSyncStore from '../../stores/excelSyncStore.ts/excelSyncStore';
import { getHref } from './getHref';

export const useInitLetter = (formik: any) => {
    const onLoad = async () => {
        if (!formik.formRef.current.isValid) {
            console.log('invalid input');
            return;
        }

        console.log('heyy');
        await formik.onSubmit(formik.formRef.current.values);

        const href = getHref();
        document.location.href = href;
        // refresh stores
        excelSyncStore.setSync(false);
    };

    return onLoad;
};
