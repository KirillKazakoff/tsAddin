/* eslint-disable no-param-reassign */
import tablesStore from '../../../../stores/tablesStore/tablesStore';
import { groupify } from '../../../utils/groupify';
import { groupByBl } from '../../exportContract/groupBy/groupByBl';
import { SalesContractsT, initSalesContract } from './initSalesContract';
import { addToAmount } from '../../../../stores/tablesStore/utils/initAmount';

export const groupSalesContract = () => {
    const contracts = tablesStore.sales.reduce<SalesContractsT>((total, row) => {
        const contract = groupify(total, initSalesContract(row), row.id);

        contract.rows.push(row);
        addToAmount(contract.amount.placesTotal, row.amount.placesTotal.count);
        addToAmount(contract.amount.priceTotal, row.amount.priceTotal.count);

        return total;
    }, {});

    // take last three contracts
    const contractsArr = Object.values(contracts).slice(-3);
    contractsArr.forEach((contract) => {
        contract.recordsGroupedBy.bl = groupByBl(contract.rows);
    });

    return contractsArr;
};
