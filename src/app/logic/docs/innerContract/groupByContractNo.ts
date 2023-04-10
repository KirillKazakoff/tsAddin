import tablesStore from '../../../stores/tablesStore/tablesStore';
import { InnerRowT } from '../../../types/typesTables';

type ContractsT = { [key: string]: InnerRowT[] };

export const groupByContractNo = () => {
    const contracts = tablesStore.innerT.reduce<ContractsT>((total, row) => {
        const { contractNo } = row;
        let contractRows = total[contractNo];

        if (!contractRows) {
            contractRows = [];
            contractRows.push(row);
        }

        return total;
    }, {});
};
