/* eslint-disable no-param-reassign */
import type { ConsigneesT } from '../../../types/typesSP';
import spsStore from '../spsStore';

export const setConsignees = (spRange: any[][]) => {
    spRange.shift();
    const transformed = spRange.reduce<ConsigneesT>((total, row) => {
        const [fullName, name, adress] = row;
        total[name] = {
            name,
            fullName,
            adress,
        };

        return total;
    }, {});

    spsStore.setConsignees(transformed);
};
