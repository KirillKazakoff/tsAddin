/* eslint-disable no-param-reassign */
import { PortsZarubezhT } from '../../../types/typesSP';
import spsStore from '../spsStore';

export const setPortsZarubezh = (spRange: any[][]) => {
    spRange.shift();

    const transformed = spRange.reduce<PortsZarubezhT>((total, row) => {
        const [
            codeName,
            nameEng,
            countryEng,
            countryRu,
            countryFullRu,
            countryFullEng,
        ] = row;

        total[codeName] = {
            codeName,
            eng: {
                name: nameEng,
                country: countryEng,
                countryFull: countryFullEng,
            },
            ru: {
                name: codeName,
                country: countryRu,
                countryFull: countryFullRu,
            },
        };
        return total;
    }, {});

    spsStore.setSp.portsZarubezh(transformed);
};
