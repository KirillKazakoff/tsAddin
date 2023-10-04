/* eslint-disable no-console */
import { useMyFormik } from './useMyFormik';

type DocGen = { record?: { id?: string } & unknown };
type SettingsT<FormValuesT, DocT extends DocGen> = {
    formik: ReturnType<typeof useMyFormik<FormValuesT>>;
    loadCb: (doc?: DocT) => Promise<void>;
    title?: string;
};

type SettingsInitT<FormValuesT, DocT extends DocGen> = {
    store: unknown & { currentId?: string };
    getSettings: (currentDoc: DocT) => SettingsT<FormValuesT, DocT>;
    docs?: DocT[];
};

export const useInitSection = <FormValuesT, DocT extends DocGen>(
    settings: SettingsInitT<FormValuesT, DocT>,
) => {
    const { getSettings, store } = settings;
    const currentDoc = store.currentId
        ? settings.docs.find((doc) => doc.record.id === store.currentId)
        : null;

    const { formik, title, loadCb } = getSettings(currentDoc);

    const onLoad = async (doc?: DocT) => {
        await formik.formRef.current.validateForm(formik.formRef.current.values);
        const { isValid, values } = formik.formRef.current;

        if (!isValid) {
            console.warn(formik.formRef.current);
            throw new Error('invalid input');
        }

        await formik.onSubmit(values);
        await loadCb(doc);
    };

    const onLoadAll = async () => {
        await Promise.all(settings.docs.map((doc) => onLoad(doc)));
    };

    const initObj = {
        onLoad,
        onLoadAll,
        docs: settings.docs,
        currentDoc,
        title,
    };

    return { initObj, formik };
};
