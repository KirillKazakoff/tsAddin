import exportContractStore from '../../../stores/docsStores/exportContractStore';
import getErrorsDescription from '../../../components/Form/getErrorsDescription';
import { OnSubmitT } from '../../../types/typesUtils';

export const useContractFormik = () => {
    const { setField, fields } = exportContractStore;
    type FormValuesT = typeof fields;

    const validate = (values: FormValuesT) => {
        const { dischargeDate, podpisant } = values;
        const errors: { [key: string]: string } = {};

        if (!dischargeDate) {
            errors.dischargeDate = 'valueMissing';
        }
        if (!podpisant) {
            errors.podpisant = 'valueMissing';
        }

        return getErrorsDescription(errors);
    };

    const onSubmit: OnSubmitT<FormValuesT> = async (values, actions) => {
        setField.dischargeDate(values.dischargeDate);
        setField.podpisant(values.podpisant.codeName);
    };

    return { onSubmit, validate, fields };
};
