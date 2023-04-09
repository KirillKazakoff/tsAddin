/* eslint-disable no-param-reassign */
import { PodpisantsT } from '../../../types/typesSP';
import spsStore from '../spsStore';

export const setPodpisants = (spRange: any[][]) => {
    spRange.shift();
    const transformed = spRange.reduce<PodpisantsT>((total, row) => {
        const [codeName, declination, nameEng, commentRu, commentEng] = row;

        total[codeName] = {
            codeName,
            eng: {
                name: nameEng,
                comment: commentEng,
            },
            ru: {
                name: codeName,
                comment: commentRu,
            },
            declination,
        };
        return total;
    }, {});

    spsStore.setPodpisants(transformed);
};
