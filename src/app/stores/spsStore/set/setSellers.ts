/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { SellersT } from '../../../types/typesSP';
import spsStore from '../spsStore';

export const setSellers = (spRange: any[][]) => {
    const transformed = spRange.reduce<SellersT>((total, row) => {
        const [
            codeName,
            form,
            fullNameRu,
            fullOutForm,
            shortName,
            addresRu,
            nameEng,
            addresEng,
            code,
            inn,
        ] = row;

        total[codeName] = {
            codeName,
            eng: {
                name: nameEng,
                address: addresEng,
            },
            ru: {
                name: fullNameRu,
                address: addresRu,
            },
            inn,
        };

        return total;
    }, {});

    spsStore.setSp.sellers(transformed);
};
