import tablesStore from '../../../stores/tablesStore/tablesStore';
import {
    addToAmount,
    initAmount,
} from '../../../stores/tablesStore/utils/initAmount';
import { InnerRowT, MateRowT } from '../../../types/typesTables';
import { groupify } from '../../utils/groupify';

const initContract = (row: InnerRowT) => {
    return {
        record: row,
        rows: <{ row: InnerRowT; mateRow: MateRowT }[]>[],
        priceTotal: initAmount(0, 2, 2),
    };
};

export type ContractT = ReturnType<typeof initContract>;
export type ContractsT = { [key: string]: ContractT };
export type ContractRowT = ContractT['rows'][number];

export const groupByContractNo = () => {
    const contracts = tablesStore.innerT.reduce<ContractsT>((total, row) => {
        const contract = groupify(total, initContract(row), row.id);

        const mateRow = tablesStore.matesT.find(
            (r) => r.konosament === row.konosament,
        );

        contract.rows.push({ mateRow, row });

        addToAmount(contract.priceTotal, row.amount.priceTotal.count);
        return total;
    }, {});

    return contracts;
};
