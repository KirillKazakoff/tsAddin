/* eslint-disable no-param-reassign */
import { TransportT, TransportsT } from '../../../types/typesSP';
import spsStore from '../spsStore';

export const setTransports = (spRange: any[][]) => {
    const transports = spRange.reduce<TransportsT>((total, row) => {
        const [codeName, nameEng, id] = row;

        const rowObj: TransportT = {
            codeName,
            eng: {
                name: nameEng,
            },
            ru: {
                name: codeName,
            },
            id,
        };

        total[codeName] = rowObj;
        return total;
    }, {});

    spsStore.setSp.transports(transports);
};
