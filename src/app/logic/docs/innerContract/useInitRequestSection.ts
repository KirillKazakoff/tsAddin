import { useEffect } from 'react';
import requestContractStore from '../../../stores/docsStores/requestContractStore';
import { createRequestContract } from './createRequestContract';
import { ContractT, groupByContractNo } from './groupByContractNo';

export const useInitRequestSection = () => {
    const contracts = Object.values(groupByContractNo());
    const { port, terms } = requestContractStore;

    const getRequest = async (contract: ContractT) => {
        await createRequestContract(contract);
    };

    const setPort = (value: string) => requestContractStore.setPort(value);
    const setTerms = (value: string) => requestContractStore.setTerms(value);

    const getAllRequests = async () => {
        contracts.forEach((contract) => getRequest(contract));
    };

    useEffect(() => {
        setPort('Владивосток');
    }, []);

    return {
        contracts,
        getRequest,
        getAllRequests,
        setPort,
        setTerms,
        port,
        terms,
    };
};
