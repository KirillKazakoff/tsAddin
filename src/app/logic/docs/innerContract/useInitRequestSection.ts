import { useEffect } from 'react';
import requestContractStore from '../../../stores/docsStores/requestContractStore';
import { createRequestContract } from './createRequestContract';
import { ContractT, groupByContractNo } from './groupByContractNo';

export const useInitRequestSection = () => {
    const contracts = Object.values(groupByContractNo());
    const {
        portTamozhnya, portRu, terms, setField,
    } = requestContractStore;

    const onLoad = async (contract: ContractT) => {
        await createRequestContract(contract);
    };

    const onLoadAll = async () => {
        await Promise.all(contracts.map((contract) => onLoad(contract)));
    };

    useEffect(() => {
        setField.terms('CFR');
        setField.portTamozhnya('Владивосток');
        setField.portRu('ДВ-Порт');
    }, []);

    return {
        contracts,
        onLoad,
        onLoadAll,
        setField,
        portTamozhnya,
        portRu,
        terms,
    };
};
