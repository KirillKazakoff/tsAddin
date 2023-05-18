/* eslint-disable no-param-reassign */
import { PackagesT, PackageT } from '../../../types/typesSP';
import spsStore from '../spsStore';

export const setPackages = (spRange: any[][]) => {
    spRange.shift();
    const packages = spRange.reduce<PackagesT>((totalObj, row) => {
        const [codeName, vessel, name, pack, coefficient] = row;

        const rowObj: PackageT = {
            codeName,
            vessel,
            name,
            pack,
            coefficient,
        };

        totalObj[codeName] = rowObj;
        return totalObj;
    }, {});

    spsStore.setSp.packages(packages);
};
