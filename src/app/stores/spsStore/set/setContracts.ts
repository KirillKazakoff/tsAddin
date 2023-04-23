/* eslint-disable no-param-reassign */
import { ContractsT } from '../../../types/typesSP';
import spsStore from '../spsStore';

export const setContracts = (spRange: any[][]) => {
    spRange.shift();
    const transformed = spRange.reduce<ContractsT>((total, row) => {
        const [
            contractNo,
            date,
            code,
            seller,
            buyerFull,
            buyer,
            bankSeller,
            timeEnd,
            status,
        ] = row;

        total[code] = {
            contractNo,
            date,
            code,
            seller,
            buyer,
            buyerFull,
            bankSeller,
            timeEnd,
            status,
        };
        return total;
    }, {});

    spsStore.setSp.contracts(transformed);
};
