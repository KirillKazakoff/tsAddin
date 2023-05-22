/* eslint-disable no-param-reassign */
import { SortAssortimentT, SortsAssortimentT } from '../../../types/typesSP';
import spsStore from '../spsStore';

export const setSortsAssortiment = (spRange: any[][]) => {
    spRange.shift();
    const sortsAssortiment = spRange.reduce<SortsAssortimentT>((totalObj, row) => {
        const [code, sort, product, weight] = row;

        const codeName = code.toLowerCase();

        const rowObj: SortAssortimentT = {
            codeName,
            sort,
            product,
            weight,
        };

        totalObj[codeName] = rowObj;
        return totalObj;
    }, {});

    spsStore.setSp.sortsAssortiment(sortsAssortiment);
};
