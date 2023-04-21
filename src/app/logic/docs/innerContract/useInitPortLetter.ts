/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';
import { useEffect } from 'react';
import portLetterStore from '../../../stores/docsStores/portLetterStore';
import { createPortLetter } from './createPortLetter';
import { ContractT, groupByContractNo } from './groupByContractNo';

export const useInitPortLetter = () => {
    const { store, setField } = portLetterStore;

    const contracts = Object.values(groupByContractNo());

    const onLoad = async (contract: ContractT) => {
        await createPortLetter(contract);
    };

    const onLoadAll = async () => {
        await Promise.all(contracts.map((contract) => onLoad(contract)));
    };

    useEffect(() => {
        setField.port('ДВ-Порт');
        setField.podpisant('Котов Н.М.');
    }, []);

    return {
        contracts,
        onLoad,
        onLoadAll,
        store,
        setField,
    };
};
