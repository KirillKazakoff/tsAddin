import tablesStore from '../../../stores/tablesStore/tablesStore';
import {
    addToAmount,
    initAmount,
} from '../../../stores/tablesStore/utils/initAmount';
import { InnerRowT, MateRowT } from '../../../types/typesTables';
import { groupify } from '../../utils/groupify';
import { RequestT, groupContractByNameSort } from './groupContractByNameSort';

const initContract = (row: InnerRowT) => {
    return {
        record: row,
        rows: <{ row: InnerRowT; mateRow: MateRowT }[]>[],
        priceTotal: initAmount(0, 2, 2),
        requests: <RequestT[]>[],
    };
};

export type ContractT = ReturnType<typeof initContract>;
export type ContractsT = { [key: string]: ContractT };
export type ContractRowT = ContractT['rows'][number];

export const groupByContractNo = () => {
    const contracts = tablesStore.innerT.reduce<ContractsT>((total, row) => {
        const contract = groupify<ContractT>(
            total,
            initContract(row),
            row.contractNo,
        );
        const mateRow = tablesStore.matesT.find(
            (r) => r.konosament === row.konosament,
        );

        contract.rows.push({ mateRow, row });

        addToAmount(contract.priceTotal, row.amount.priceTotal.count);
        return total;
    }, {});

    Object.entries(contracts).forEach(([key, contract]) => {
        contracts[key] = groupContractByNameSort(contract);
    });

    return contracts;
};
