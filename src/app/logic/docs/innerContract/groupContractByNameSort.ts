/* eslint-disable no-param-reassign */
import {
    addToAmount,
    initAmount,
} from '../../../stores/tablesStore/utils/initAmount';
import { InnerRowT } from '../../../types/typesTables';
import { groupify } from '../../utils/groupify';
import type { ContractT } from './groupByContractNo';

const initRequest = (record: InnerRowT) => ({
    record: <InnerRowT>record,
    amountTotal: initAmount(0, 3, 3),
    priceTotal: initAmount(0, 2, 2),
});

export type RequestT = ReturnType<typeof initRequest>;

export const groupContractByNameSort = (contract: ContractT) => {
    contract.rows.forEach((row) => {
        const request = groupify<RequestT>(
            contract.requests,
            initRequest(row),
            `${row.product.codeName}${row.sort}${row.amount.price.count}`,
        );

        addToAmount(request.amountTotal, row.amount.placesTotal.count);
        addToAmount(request.priceTotal, row.amount.priceTotal.count);
    });

    contract.requests = Object.values(contract.requests);
    return contract;
};
