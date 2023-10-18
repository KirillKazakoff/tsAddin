/* eslint-disable no-param-reassign */
import { ConfidentialPhonesT } from '../../../types/typesSP';
import spsStore from '../spsStore';

export const setConfidentialPhone = (spRange: any[][]) => {
    spRange.shift();
    const transformed = spRange.reduce<ConfidentialPhonesT>((total, row) => {
        const [codeName, name, fullName, phone] = row;

        total[codeName] = {
            codeName,
            name,
            fullName,
            phone,
        };
        return total;
    }, {});

    spsStore.setSp.confidentialPhones(transformed);
};
