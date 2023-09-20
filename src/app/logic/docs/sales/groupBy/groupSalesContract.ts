/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import _ from 'lodash';
import tablesStore from '../../../../stores/tablesStore/tablesStore';
import { SalesRowT } from '../../../../types/typesTables';
import { groupify } from '../../../utils/groupify';
import { groupByBl } from '../../exportContract/groupBy/groupByBl';
import {
    SalesContractT,
    SalesContractsT,
    initSalesContract,
} from './initSalesContract';

export const groupSalesContract = () => {
    const contracts = tablesStore.sales.reduce<SalesContractsT>((total, row) => {
        const contract = groupify<SalesContractT>(
            total,
            initSalesContract(row),
            row.id,
        );

        contract.rows.push(row);
        contract.priceTotal += row.amount.priceTotal.count;
        return total;
    }, {});

    // take last ten contracts
    const contractsArr = Object.values(contracts).slice(-3);
    contractsArr.forEach((contract) => {
        contract.recordsGroupedBy.bl = groupByBl<SalesRowT>(contract.rows);
    });

    return contractsArr;
};
