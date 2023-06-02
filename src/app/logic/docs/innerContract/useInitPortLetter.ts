import portLetterStore from '../../../stores/docsStores/portLetterStore';
import { createPortLetter } from './createPortLetter';
import { ContractT, groupByContractNo } from './groupByContractNo';
import { usePortLetterFormik } from './usePortLetterFormik';

export const useInitPortLetter = () => {
    const formik = usePortLetterFormik();
    const { fields } = portLetterStore;

    const contracts = Object.values(groupByContractNo());

    const onLoad = async (contract: ContractT) => {
        if (!formik.formRef.current.isValid) {
            throw new Error('invalid input');
        }
        await createPortLetter(contract);
    };

    const onLoadAll = async () => {
        await Promise.all(contracts.map((contract) => onLoad(contract)));
    };

    const initObj = {
        contracts,
        onLoad,
        onLoadAll,
        fields,
    };
    return { initObj, formik };
};
