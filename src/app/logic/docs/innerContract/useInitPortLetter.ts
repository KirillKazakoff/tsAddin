import portLetterStore from '../../../stores/docsStores/portLetterStore';
import { createPortLetter } from './createPortLetter';
import { ContractT, groupByContractNo } from './groupByContractNo';

export const useInitPortLetter = (formik: any) => {
    const { store, setField, toggle } = portLetterStore;

    const contracts = Object.values(groupByContractNo());

    const onLoad = async (contract: ContractT) => {
        if (!formik.current.isValid) {
            console.log(formik.current);
            throw new Error('invalid input');
        }
        await createPortLetter(contract);
    };

    const onLoadAll = async () => {
        await Promise.all(contracts.map((contract) => onLoad(contract)));
    };

    return {
        contracts,
        onLoad,
        onLoadAll,
        store,
        setField,
        toggle,
    };
};
