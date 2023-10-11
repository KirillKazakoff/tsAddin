/* eslint-disable no-param-reassign */
import { BanksProdavecT } from '../../../types/typesSP';
import spsStore from '../spsStore';

export const setBanksProdavec = (spRange: any[][]) => {
    spRange.shift();
    const transformed = spRange.reduce<BanksProdavecT>((total, row) => {
        const [
            codeName,
            nameEng,
            adress,
            swift,
            intermediary,
            intermediaryAddres,
            intermediarySwift,
            inForwardRu,
            inForwardEng,
            accountNo,
        ] = row;

        total[codeName] = {
            codeName,
            eng: {
                name: nameEng,
                inForward: inForwardEng,
            },
            ru: {
                name: codeName,
                inForward: inForwardRu,
            },
            address: adress,
            swift,
            intermediary,
            intermediaryAddres,
            intermediarySwift,
            accountNo,
        };

        return total;
    }, {});

    spsStore.setSp.banksProdavec(transformed);
};
