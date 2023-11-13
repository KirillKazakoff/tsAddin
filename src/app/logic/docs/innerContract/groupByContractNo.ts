import tablesStore from '../../../stores/tablesStore/tablesStore';
import {
    addToAmount,
    addToAmountObj,
    initAmount,
    initAmountObj,
} from '../../../stores/tablesStore/utils/initAmount';
import { InnerRowT, MateRowT } from '../../../types/typesTables';
import { groupify } from '../../utils/groupify';

type InnerCombRowT = { row: InnerRowT; mateRow: MateRowT };

const initRequestGroup = (row: InnerCombRowT) => ({
    record: row,
    rows: <InnerCombRowT[]>[],
    total: initAmountObj(row.row.type),
});

export type RequestGroupT = ReturnType<typeof initRequestGroup>;

const initContract = (row: InnerRowT) => ({
    record: row,
    rows: <InnerCombRowT[]>[],
    requestGroup: <Record<string, RequestGroupT>>{},
    requestGroupArr: <RequestGroupT[]>[],
    priceTotal: initAmount(0, 2, 2),
});

export type ContractT = ReturnType<typeof initContract>;
export type ContractsT = { [key: string]: ContractT };
export type ContractRowT = ContractT['rows'][number];

export const groupByContractNo = () => {
    const contracts = tablesStore.innerT.reduce<ContractsT>((total, row) => {
        const contract = groupify(total, initContract(row), row.id);

        const mateRow = tablesStore.matesT.find((r) => r.konosament === row.konosament);
        const combinedRow: InnerCombRowT = { mateRow, row };

        contract.rows.push(combinedRow);
        const res = initRequestGroup(combinedRow);
        addToAmount(contract.priceTotal, row.amount.priceTotal.count);

        const requestGrouped = groupify(
            contract.requestGroup,
            res,
            row.product.codeName + row.sort + row.pack,
        );
        requestGrouped.rows.push(combinedRow);
        addToAmountObj(requestGrouped.total, row.amount);

        return total;
    }, {});

    Object.values(contracts).forEach((contract) => {
        contract.requestGroupArr.push(...Object.values(contract.requestGroup));
    });

    return contracts;
};
