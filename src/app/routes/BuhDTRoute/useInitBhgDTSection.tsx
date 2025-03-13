/* eslint-disable no-param-reassign */
import { useInitSection } from '../../components/Form/useInitSection';
import { useMyFormik } from '../../components/Form/useMyFormik';
import buhDTStore from '../../stores/mailStores/buhDTStore';
import { createBhgMail } from './createBhgMail';

export const useInitBhgDTSection = () => {
    const formik = useMyFormik({
        store: buhDTStore,
        initialFields: {
            dt: '',
        },
        validateCb(errors, values) {
            if (!values.dt) errors.dt = 'valueMissing';
        },
    });

    return useInitSection({
        store: buhDTStore as any,
        getSettings: () => ({
            formik,
            createDoc: () => ({
                initTmpsCb: () => {
                    const href = createBhgMail();
                    document.location.href = href;
                },
            }),
        }),
    });
};
