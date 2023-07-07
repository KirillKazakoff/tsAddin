import requestContractStore from '../../../stores/docsStores/requestContractStore';
import { createRequestContract } from './createRequestContract';
import { ContractT, groupByContractNo } from './groupByContractNo';
import { useRequestFormik } from './useRequestFormik';

export const useInitRequestSection = () => {
    const formik = useRequestFormik();
    const contracts = Object.values(groupByContractNo());

    const { portTamozhnya, portRu, terms } = requestContractStore.fields;

    const onLoad = async (contract: ContractT) => {
        if (!formik.formRef?.current?.isValid) {
            throw new Error('invalid input');
        }
        await createRequestContract(contract);
    };

    const onLoadAll = async () => {
        await Promise.all(contracts.map((contract) => onLoad(contract)));
    };

    const initObj = {
        contracts,
        onLoad,
        onLoadAll,
        portTamozhnya,
        portRu,
        terms,
    };
    return {
        initObj,
        formik,
    };
};
