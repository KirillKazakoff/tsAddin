/* eslint-disable no-param-reassign */
import { PortsTamozhnyaT } from '../../types/typesSP';
import spsStore from './spsStore';

export const setPortsTamozhnya = (spRange: any[][]) => {
    const transformed = spRange.reduce<PortsTamozhnyaT>((total, row) => {
        const [name, nameEng, fullName] = row;

        total[name] = {
            name,
            nameEng,
            fullName,
        };
        return total;
    }, {});

    spsStore.setPortsTamozhnya(transformed);
};
