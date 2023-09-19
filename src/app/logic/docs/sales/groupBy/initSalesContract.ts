import { SalesRowT } from '../../../../types/typesTables';

export const initSalesContract = (row: SalesRowT) => {
    const isLive = row.product.codeName.toLowerCase().includes('live');
    const contract = {
        record: row,
        rows: <SalesRowT[]>[],
        recordsGroupedBy: {
            bl: {},
        },
        priceTotal: 0,
        isLive,
    };
    return contract;
};

export type SalesContractT = ReturnType<typeof initSalesContract>;
export type SalesContractsT = { [key: string]: SalesContractT };
