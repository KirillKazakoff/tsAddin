/* eslint-disable no-param-reassign */
import { PortsZarubezhT } from '../../../types/typesSP';
import spsStore from '../spsStore';

export const setPortsZarubezh = (spRange: any[][]) => {
    const transformed = spRange.reduce<PortsZarubezhT>((total, row) => {
        const [codeName, nameEng, countryEng, countryRu] = row;

        total[codeName] = {
            codeName,
            eng: {
                name: nameEng,
                country: countryEng,
            },
            ru: {
                name: codeName,
                country: countryRu,
            },
        };
        return total;
    }, {});

    spsStore.setSp.portsZarubezh(transformed);
};
