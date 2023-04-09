/* eslint-disable no-param-reassign */
import type { ConsigneesT } from '../../../types/typesSP';
import spsStore from '../spsStore';

export const setConsignees = (spRange: any[][]) => {
    spRange.shift();
    const transformed = spRange.reduce<ConsigneesT>((total, row) => {
        const [fullName, codeName, adress] = row;
        total[codeName] = {
            codeName,
            fullName,
            adress,
        };

        return total;
    }, {});

    spsStore.setConsignees(transformed);
};
