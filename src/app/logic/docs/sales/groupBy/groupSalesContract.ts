import tablesStore from '../../../../stores/tablesStore/tablesStore';
import { groupify } from '../../../utils/groupify';
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
            row.contractNo,
        );

        contract.rows.push(row);
        return total;
    }, {});

    const contractsArr = Object.values(contracts).slice(-10);
    // contractsArr.forEach((contract) => {
    //     contract.recordsGroupedBy.bl =
    // })
};
