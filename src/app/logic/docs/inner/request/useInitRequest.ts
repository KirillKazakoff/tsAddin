import { useInitInnerContract } from '../innerContract/useInitInnerContract';
import { createRequest } from './createRequest';

export const useInitRequest = () => {
    const { initObj: iObj } = useInitInnerContract();

    const invoicesOnly = iObj.docs.reduce<typeof iObj.docs>((invoices, contract) => {
        if (!contract.record.row.id.toString().toLowerCase().includes('счет')) return invoices;
        invoices.push(contract);

        return invoices;
    }, []);

    return {
        docs: invoicesOnly,
        onLoad: createRequest,
    };
};
