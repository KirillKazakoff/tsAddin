/* eslint-disable no-param-reassign */
import type { ConsigneesT } from '../../../types/typesSP';
import spsStore from '../spsStore';

export const setConsignees = (spRange: any[][]) => {
    spRange.shift();
    const transformed = spRange.reduce<ConsigneesT>((total, row) => {
        const [fullName, codeName, addres] = row;
        total[codeName] = {
            codeName,
            fullName: fullName.toUpperCase(),
            addres: addres.toUpperCase(),
        };

        return total;
    }, {});

    spsStore.setSp.consignees(transformed);
};
