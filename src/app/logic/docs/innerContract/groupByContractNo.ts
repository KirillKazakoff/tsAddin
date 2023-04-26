/* eslint-disable no-param-reassign */
import tablesStore from '../../../stores/tablesStore/tablesStore';
import {
    addToAmount,
    initAmount,
} from '../../../stores/tablesStore/utils/initAmount';
import { InnerRowT } from '../../../types/typesTables';

const initContract = (row: InnerRowT) => {
    const rows: InnerRowT[] = [];
    return {
        record: row,
        rows,
        priceTotal: initAmount(0, 2, 2),
    };
};

export type ContractT = ReturnType<typeof initContract>;

export type ContractsT = { [key: string]: ContractT };

export const groupByContractNo = () => {
    const contracts = tablesStore.innerT.reduce<ContractsT>((total, row) => {
        const { contractNo } = row;
        let contract = total[contractNo];

        if (!contract) {
            contract = initContract(row);
            total[contractNo] = contract;
        }

        contract.rows.push(row);

        addToAmount(contract.priceTotal, row.amount.priceTotal.count);
        return total;
    }, {});

    return contracts;
};
