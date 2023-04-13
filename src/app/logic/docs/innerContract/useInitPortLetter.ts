import portLetterStore from '../../../stores/docsStores/portLetterStore';
import { createPortLetter } from './createPortLetter';
import { ContractT, groupByContractNo } from './groupByContractNo';

export const useInitPortLetter = () => {
    const { store } = portLetterStore;

    const contracts = Object.values(groupByContractNo());

    const getLetter = async (contract: ContractT) => {
        await createPortLetter(contract);
    };

    const getAllLetters = () => {
        contracts.forEach((contract) => getLetter(contract));
    };

    // const setField ={
    //     port: (value: string) => portLetterStore.setPort(value),
    //     podpisant: (value: string) =>
    // }

    return {
        contracts,
        getLetter,
        getAllLetters,
    };
};
