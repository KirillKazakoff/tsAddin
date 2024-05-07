/* eslint-disable no-param-reassign */
import { useInitSection } from '../../components/Form/useInitSection';
import { useMyFormik } from '../../components/Form/useMyFormik';
import excelSyncStore from '../../stores/excelSyncStore.ts/excelSyncStore';
import letterStore from '../../stores/letterStore/letterStore';
import { getHref } from './getHref';

export const useInitLetterSection = () => {
    const formik = useMyFormik({
        store: letterStore,
        initialFields: {
            port: '',
            arrivalVld: '',
            payment: '',
            isExport: false,
            arrivalForeign: '',
            terms: '',
            ground: '',
        },
        validateCb(errors, values) {
            if (!values.port) errors.port = 'valueMissing';
            if (!values.arrivalVld) errors.arrivalVld = 'valueMissing';
            if (!values.payment) errors.payment = 'valueMissing';
            if (values.isExport) {
                if (!values.arrivalForeign) errors.arrivalForeign = 'valueMissing';
                if (!values.terms) errors.terms = 'valueMissing';
                if (!values.ground) errors.ground = 'valueMissing';
            } else if (!values.isExport) {
                delete errors.arrivalForeign;
                delete errors.terms;
                delete errors.ground;
            }
        },
    });

    return useInitSection({
        store: letterStore as any,
        getSettings: () => ({
            formik,
            createDoc: () => {
                return {
                    initTmpsCb: () => {
                        const href = getHref();
                        document.location.href = href;
                        // refresh stores
                        excelSyncStore.setSync(false);
                    },
                };
            },
        }),
    });
};
