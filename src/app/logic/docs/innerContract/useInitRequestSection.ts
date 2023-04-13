import { useEffect } from 'react';
import requestContractStore from '../../../stores/docsStores/requestContractStore';
import { createRequestContract } from './createRequestContract';
import { ContractT, groupByContractNo } from './groupByContractNo';

export const useInitRequestSection = () => {
    const contracts = Object.values(groupByContractNo());
    const { portTamozhnya, portRu, terms } = requestContractStore;

    const getRequest = async (contract: ContractT) => {
        await createRequestContract(contract);
    };

    const setPortTamozhnya = (value: string) => requestContractStore.setPortTamozhnya(value);
    const setPortRu = (value: string) => requestContractStore.setPortRu(value);
    const setTerms = (value: string) => requestContractStore.setTerms(value);

    const getAllRequests = async () => {
        contracts.forEach((contract) => getRequest(contract));
    };

    useEffect(() => {
        setTerms('CFR');
        setPortTamozhnya('Владивосток');
        setPortRu('ДВ-Порт');
    }, []);

    return {
        contracts,
        getRequest,
        getAllRequests,

        setPortTamozhnya,
        setTerms,
        setPortRu,

        portTamozhnya,
        portRu,
        terms,
    };
};
