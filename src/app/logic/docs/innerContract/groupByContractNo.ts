/* eslint-disable no-param-reassign */
import tablesStore from '../../../stores/tablesStore/tablesStore';
import {
    addToAmount,
    initAmount,
} from '../../../stores/tablesStore/utils/initAmount';
import { InnerRowT } from '../../../types/typesTables';
import { groupify } from '../../utils/groupify';
import { RequestT, groupContractByNameSort } from './groupContractByNameSort';

const initContract = (row: InnerRowT) => {
    const rows: InnerRowT[] = [];
    return {
        record: row,
        rows,
        priceTotal: initAmount(0, 2, 2),
        requests: <RequestT[]>[],
    };
};

export type ContractT = ReturnType<typeof initContract>;

export type ContractsT = { [key: string]: ContractT };

export const groupByContractNo = () => {
    const contracts = tablesStore.innerT.reduce<ContractsT>((total, row) => {
        const contract = groupify<ContractT>(
            total,
            initContract(row),
            row.contractNo,
        );
        contract.rows.push(row);

        addToAmount(contract.priceTotal, row.amount.priceTotal.count);
        return total;
    }, {});

    Object.entries(contracts).forEach(([key, contract]) => {
        contracts[key] = groupContractByNameSort(contract);
    });

    return contracts;
};
