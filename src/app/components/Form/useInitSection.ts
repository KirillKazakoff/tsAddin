import { useMyFormik } from './useMyFormik';

type SettingsT<FormValuesT, DocT> = {
    useFormik: ReturnType<typeof useMyFormik<FormValuesT>>;
    docs: DocT[];
};

export const useInitSection = () => {};
