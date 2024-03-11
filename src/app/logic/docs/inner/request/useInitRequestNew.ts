import { useInitInnerContract } from '../innerContract/useInitInnerContract';
import { createRequestNew } from './createRequestNew';

export const useInitRequestNew = () => {
    const { initObj: iObj } = useInitInnerContract();

    const invoicesOnly = iObj.docs.reduce<typeof iObj.docs>((invoices, contract) => {
        if (!contract.record.row.id.toLowerCase().includes('счет')) return invoices;
        invoices.push(contract);

        return invoices;
    }, []);

    return {
        docs: invoicesOnly,
        onLoad: createRequestNew,
    };
};
