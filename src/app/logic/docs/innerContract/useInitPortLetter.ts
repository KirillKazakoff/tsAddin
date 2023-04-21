/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';
import { useEffect } from 'react';
import portLetterStore from '../../../stores/docsStores/portLetterStore';
import { createPortLetter } from './createPortLetter';
import { ContractT, groupByContractNo } from './groupByContractNo';

export const useInitPortLetter = () => {
    const { store, setField } = portLetterStore;

    const contracts = Object.values(groupByContractNo());

    const getLetter = async (contract: ContractT) => {
        await createPortLetter(contract);
    };

    const getAllLetters = () => {
        contracts.forEach((contract) => getLetter(contract));
    };

    useEffect(() => {
        setField.port('ДВ-Порт');
        setField.podpisant('Котов Н.М.');
    }, []);

    return {
        contracts,
        getLetter,
        getAllLetters,
        store,
        setField,
    };
};
