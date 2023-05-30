import exportContractStore from '../../../stores/docsStores/exportContractStore';
import getErrorsDescription from '../../../components/Form/getErrorsDescription';
import { InitContractObjT } from './useInitContractSection';
import { AgreementT } from './groupBy/initAgreement';

export const useContractFormik = (initObj: InitContractObjT) => {
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

    const onSubmit = async (values: FormValuesT) => {
        setField.dischargeDate(values.dischargeDate);
        setField.podpisant(values.podpisant.codeName);
    };

    const onLoad = async (agreement: AgreementT) => {
        initObj.onLoad(agreement);
    };

    return { onSubmit, validate, fields };
};
