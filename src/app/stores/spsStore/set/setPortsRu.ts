/* eslint-disable no-param-reassign */
import { PortsRuT } from '../../../types/typesSP';
import spsStore from '../spsStore';

export const setPortsRu = (spRange: any[][]) => {
    spRange.shift();

    const transformed = spRange.reduce<PortsRuT>((total, row) => {
        const [codeName, name, phone, director, mail] = row;

        total[codeName] = {
            codeName,
            name,
            phone,
            director,
            mail,
        };

        return total;
    }, {});

    spsStore.setSp.portsRu(transformed);
};
