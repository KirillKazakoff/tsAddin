/* eslint-disable no-param-reassign */
import { ClientRuT, ClientsRuT } from '../../../types/typesSP';
import spsStore from '../spsStore';

export const setClientsRu = (spRange: any[][]) => {
    spRange.shift();
    const transformed = spRange.reduce<ClientsRuT>((total, row) => {
        const [name, codeName, inn, phone, mail] = row;

        const rowObj: ClientRuT = {
            codeName,
            name,
            inn,
            phone,
            mail,
        };

        total[codeName] = rowObj;

        return total;
    }, {});

    spsStore.setSp.clientsRu(transformed);
};
