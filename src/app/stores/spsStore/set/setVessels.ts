/* eslint-disable no-param-reassign */
import { VesselsT } from '../../../types/typesSP';
import spsStore from '../spsStore';

export const setVessels = (spRange: any[][]) => {
    spRange.shift();

    const transformed = spRange.reduce<VesselsT>((total, vessel) => {
        const [codeName, nameEng, id] = vessel;
        total[codeName] = {
            codeName,
            eng: { name: nameEng },
            ru: { name: codeName },
            id,
        };
        return total;
    }, {});

    spsStore.setSp.vessels(transformed);
};
