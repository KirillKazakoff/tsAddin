/* eslint-disable no-param-reassign */
import { BanksProdavecT } from '../../../types/typesSP';
import spsStore from '../spsStore';

export const setBanksProdavec = (spRange: any[][]) => {
    spRange.shift();
    const transformed = spRange.reduce<BanksProdavecT>((total, row) => {
        const [
            name,
            nameEng,
            adress,
            swift,
            intermediary,
            intermediaryAddres,
            intermediarySwift,
            inForward,
            inForwardEng,
            accountNo,
        ] = row;

        total[name] = {
            name,
            nameEng,
            adress,
            swift,
            intermediary,
            intermediaryAddres,
            intermediarySwift,
            inForward,
            inForwardEng,
            accountNo,
        };

        return total;
    }, {});

    spsStore.setBanksProdavec(transformed);
};
