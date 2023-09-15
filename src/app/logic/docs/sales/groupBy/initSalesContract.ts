import { SalesRowT } from '../../../../types/typesTables';

export const initSalesContract = (row: SalesRowT) => {
    const contract = {
        record: row,
        rows: <SalesRowT[]>[],
        recordsGroupedBy: {
            bl: {},
        },
        priceTotal: 0,
    };
    return contract;
};

export type SalesContractT = ReturnType<typeof initSalesContract>;
export type SalesContractsT = { [key: string]: SalesContractT };
