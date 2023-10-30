/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import _ from 'lodash';
import tablesStore from '../../../../stores/tablesStore/tablesStore';
import { groupify } from '../../../utils/groupify';
import { groupByBl } from '../../exportContract/groupBy/groupByBl';
import { SalesContractsT, initSalesContract } from './initSalesContract';
import { addToAmount } from '../../../../stores/tablesStore/utils/initAmount';
import { SalesRowT } from '../../../../types/typesTables';

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
        const blGroups = groupByBl(contract.rows);
        contract.groupedBy.bl = blGroups;

        contract.groupedBy.blProduct = Object.values(blGroups).reduce<SalesRowT[]>(
            (total, blGroup) => {
                const allRows = blGroup.groupedProductsArr.map((prodGroup) => {
                    const cloneGroup = _.cloneDeep(prodGroup);
                    cloneGroup.record.amount.placesTotal = cloneGroup.total.placesTotal;
                    cloneGroup.record.amount.priceTotal = cloneGroup.total.priceTotal;
                    cloneGroup.record.sort = '-';
                    return cloneGroup.record;
                });
                total.push(...allRows);
                return total;
            },
            [],
        );

        if (contract.groupedBy.blProduct.length === 0) {
            contract.groupedBy.blProduct = contract.rows;
        }
    });

    return contractsArr;
};
