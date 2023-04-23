/* eslint-disable no-param-reassign */
import { VesselsT } from '../../../types/typesSP';
import tablesStore from '../../tablesStore/tablesStore';
import spsStore from '../spsStore';

export const setVessels = (spRange: any[][]) => {
    const { matesT: mates } = tablesStore;
    const vesselsArr = mates.map((row) => row.vessel);
    const vesselsMate = Array.from(new Set(vesselsArr));

    const vessels = spRange.filter((row) => {
        return vesselsMate.some((vessel) => vessel === row[0]);
    });

    const transformed = vessels.reduce<VesselsT>((total, vessel) => {
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
