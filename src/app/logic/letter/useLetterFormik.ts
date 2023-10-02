/* eslint-disable no-param-reassign */
import letterStore from '../../stores/letterStore/letterStore';
import { useMyFormik } from '../../components/Form/useMyFormik';

export const useLetterFormik = () => {
    return useMyFormik({
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
};
