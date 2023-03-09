/* eslint-disable no-param-reassign */
import { ProductDescriptionT, ProductionNewT } from '../../types/typesSP';
import spsStore from './spsStore';
import tablesStore from '../tablesStore/tablesStore';

export const setProduction = (spRange: any[][]) => {
    const { mates } = tablesStore;

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

        const isInTable = mates.some(({ product }) => {
            return product.toLowerCase() === name.toLowerCase();
        });

        if (!isInTable) return totalObj;
        totalObj[name] = rowObj;
        return totalObj;
    }, {});

    spsStore.setProduction(production);
};
