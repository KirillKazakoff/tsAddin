/* eslint-disable no-param-reassign */
import { ProductDescriptionT, ProductionNewT } from '../../types/typesSP';
import spsStore from './spsStore';

export const setProduction = (spRange: any[][]) => {
    const production = spRange.reduce<ProductionNewT>((totalObj, row) => {
        const [fullName, nameEng, name, expirationDate, pack, packEng, standart] = row;

        const rowObj: ProductDescriptionT = {
            name: name.toLowerCase(),
            fullName,
            nameEng,
            expirationDate: expirationDate || 'ХХХ',
            pack: pack || 'Нет упаковки',
            packEng: packEng || 'No package',
            standart: standart || 'Нет стандарта',
        };

        totalObj[name] = rowObj;
        return totalObj;
    }, {});

    spsStore.setProduction(production);
};
