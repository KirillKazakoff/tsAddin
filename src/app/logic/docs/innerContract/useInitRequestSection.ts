import requestContractStore from '../../../stores/docsStores/requestContractStore';
import { createRequestContract } from './createRequestContract';
import { ContractT, groupByContractNo } from './groupByContractNo';

export const useInitRequestSection = (formik: any) => {
    const contracts = Object.values(groupByContractNo());
    const {
        portTamozhnya, portRu, terms, setField,
    } = requestContractStore;

    const onLoad = async (contract: ContractT) => {
        if (!formik.current.isValid) {
            throw new Error('invalid input');
        }
        await createRequestContract(contract);
    };

    const onLoadAll = async () => {
        await Promise.all(contracts.map((contract) => onLoad(contract)));
    };

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
