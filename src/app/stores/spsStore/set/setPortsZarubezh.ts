/* eslint-disable no-param-reassign */
import { PortsZarubezhT } from '../../../types/typesSP';
import spsStore from '../spsStore';

export const setPortsZarubezh = (spRange: any[][]) => {
    const transformed = spRange.reduce<PortsZarubezhT>((total, row) => {
        const [name, nameEng, countryEng, country] = row;

        total[name] = {
            name,
            nameEng,
            countryEng,
            country,
        };
        return total;
    }, {});

    spsStore.setPortsZarubezh(transformed);
};
