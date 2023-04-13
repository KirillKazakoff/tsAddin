import { useEffect } from 'react';
import requestContractStore from '../../../stores/docsStores/requestContractStore';
import { createRequestContract } from './createRequestContract';
import { ContractT, groupByContractNo } from './groupByContractNo';

export const useInitRequestSection = () => {
    const contracts = Object.values(groupByContractNo());
    const {
        portTamozhnya, portRu, terms, setField,
    } = requestContractStore;

    const getRequest = async (contract: ContractT) => {
        await createRequestContract(contract);
    };

    const getAllRequests = async () => {
        contracts.forEach((contract) => getRequest(contract));
    };

    useEffect(() => {
        requestContractStore.setField.terms('CFR');
        setField.portTamozhnya('Владивосток');
        setField.portRu('ДВ-Порт');
    }, []);

    return {
        contracts,
        getRequest,
        getAllRequests,

        setField,
        portTamozhnya,
        portRu,
        terms,
    };
};
