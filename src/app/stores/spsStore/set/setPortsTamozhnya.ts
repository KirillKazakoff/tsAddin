/* eslint-disable no-param-reassign */
import { PortsTamozhnyaT } from '../../../types/typesSP';
import spsStore from '../spsStore';

export const setPortsTamozhnya = (spRange: any[][]) => {
    const transformed = spRange.reduce<PortsTamozhnyaT>((total, row) => {
        const [codeName, nameEng, fullName] = row;

        total[codeName] = {
            codeName,
            eng: {
                name: nameEng,
            },
            ru: {
                name: codeName,
            },
        };
        return total;
    }, {});

    spsStore.setPortsTamozhnya(transformed);
};
