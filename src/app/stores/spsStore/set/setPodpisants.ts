/* eslint-disable no-param-reassign */
import { PodpisantsT } from '../../../types/typesSP';
import spsStore from '../spsStore';

export const setPodpisants = (spRange: any[][]) => {
    spRange.shift();
    const transformed = spRange.reduce<PodpisantsT>((total, row) => {
        const [name, declination, nameEng, comment, commentEng] = row;

        total[name] = {
            name,
            nameEng,
            declination,
            comment,
            commentEng,
        };
        return total;
    }, {});

    console.log(transformed);
    spsStore.setPodpisants(transformed);
};
