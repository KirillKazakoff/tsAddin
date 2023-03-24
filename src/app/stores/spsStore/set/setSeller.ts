/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { SellersT } from '../../../types/typesSP';
import spsStore from '../spsStore';

export const setSellers = (spRange: any[][]) => {
    const transformed = spRange.reduce<SellersT>((total, row) => {
        const [name, fullName, addres, nameEng, addresEng, code, inn] = row;
        total[name] = {
            name,
            fullName,
            addres,
            nameEng,
            addresEng,
            inn,
        };

        return total;
    }, {});

    spsStore.setSellers(transformed);
};
