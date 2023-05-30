import { FormikHelpers } from 'formik';
import exportContractStore from '../../../stores/docsStores/exportContractStore';
import getErrorsDescription from '../../../components/Form/getErrorsDescription';

export const useExportSettings = () => {
    const initialValues = exportContractStore.fields;
    type FormValuesT = typeof initialValues;

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

    const onSubmit = async (
        values: FormValuesT,
        actions: FormikHelpers<FormValuesT>,
    ) => {
        exportContractStore.setField.dischargeDate(values.dischargeDate);
    };

    return { onSubmit, validate, initialValues };
};
