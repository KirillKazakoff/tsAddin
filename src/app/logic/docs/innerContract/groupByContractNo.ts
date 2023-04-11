/* eslint-disable no-param-reassign */
import tablesStore from '../../../stores/tablesStore/tablesStore';
import { initAmount } from '../../../stores/tablesStore/utils/initAmount';
import { InnerRowT } from '../../../types/typesTables';

const initContract = (row: InnerRowT) => {
    const rows: InnerRowT[] = [];
    return {
        record: row,
        rows,
        priceTotal: initAmount(),
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

        contract.priceTotal.count += row.amount.priceTotal.count;
        contract.priceTotal = initAmount(contract.priceTotal.count, 2, 2);
        return total;
    }, {});

    return contracts;
};
