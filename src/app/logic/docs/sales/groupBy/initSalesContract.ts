import { initAmount } from '../../../../stores/tablesStore/utils/initAmount';
import { GroupedBlT } from '../../../../types/typesContract';
import { SalesRowT } from '../../../../types/typesTables';

export const initSalesContract = (row: SalesRowT) => {
    const contract = {
        record: row,
        rows: <SalesRowT[]>[],
        recordsGroupedBy: {
            bl: <GroupedBlT<SalesRowT>>{},
        },
        amount: {
            priceTotal: initAmount(0, 2, 2),
            placesTotal: initAmount(0, 2, 2),
        },
    };
    return contract;
};

export type SalesContractT = ReturnType<typeof initSalesContract>;
export type SalesContractsT = { [key: string]: SalesContractT };
