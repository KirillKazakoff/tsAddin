import { useEffect } from 'react';
import portLetterStore from '../../../stores/docsStores/portLetterStore';
import { createPortLetter } from './createPortLetter';
import { ContractT, groupByContractNo } from './groupByContractNo';
import { tryCatch } from '../../excel/utils/tryCatch';

const initPortLetter = () => {
    const { store, setField, toggle } = portLetterStore;

    const contracts = Object.values(groupByContractNo());

    const onLoad = async (contract: ContractT) => {
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

export const useInitPortLetter = () => {
    const { setField } = portLetterStore;

    useEffect(() => {
        setField.port('ДВ-Порт');
        setField.podpisant('Котов Н.М.');
    }, []);

    return tryCatch<typeof initPortLetter>(initPortLetter);
};
