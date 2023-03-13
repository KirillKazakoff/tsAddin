/* eslint-disable no-param-reassign */
import { ProductDescriptionT, ProductionNewT } from '../../types/typesSP';
import spsStore from './spsStore';

export const setProduction = (spRange: any[][]) => {
    const production = spRange.reduce<ProductionNewT>((totalObj, row) => {
        const [fullName, nameEng, name, expirationDate, pack, packEng, standart] = row;
        const shortName = name.toLowerCase();

        const rowObj: ProductDescriptionT = {
            name: shortName,
            fullName,
            nameEng,
            expirationDate: expirationDate || 'ХХХ',
            pack: pack || 'Нет упаковки',
            packEng: packEng || 'No package',
            standart: standart || 'Нет стандарта',
        };

        totalObj[shortName] = rowObj;
        return totalObj;
    }, {});

    spsStore.setProduction(production);
};
