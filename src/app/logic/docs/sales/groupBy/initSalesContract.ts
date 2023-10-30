import { initAmount } from '../../../../stores/tablesStore/utils/initAmount';
import { SalesRowT } from '../../../../types/typesTables';
import { BlGroupsT } from '../../exportContract/groupBy/initBlGroup';

export const initSalesContract = (row: SalesRowT) => {
    const contract = {
        record: row,
        rows: <SalesRowT[]>[],
        groupedBy: {
            bl: <BlGroupsT<SalesRowT>>{},
            blProduct: <SalesRowT[]>[],
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
