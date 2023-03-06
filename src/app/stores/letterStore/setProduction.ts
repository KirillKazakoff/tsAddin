/* eslint-disable no-param-reassign */
import { ProductDescriptionT, ProductionNewT } from '../../types/typesSP';
import { TAB } from '../../utils/constants';
import letterStore from './letterStore';

export const setProduction = (spRange: any[][]) => {
    const { table } = letterStore.letter;

    const production = spRange.reduce<ProductionNewT>((totalObj, row) => {
        const [fullName, nameEng, name, expirationDate, pack, packEng, standart] = row;

        const rowObj: ProductDescriptionT = {
            name: name.toLowerCase(),
            fullName,
            nameEng,
            expirationDate: expirationDate || 'ХХХ',
            pack: pack || 'Нет упаковки',
            packEng: packEng || 'No package',
            standart: standart || `${TAB}Нет стандарта`,
        };

        const isInTable = table.some(({ product }) => {
            return product.toLowerCase() === name.toLowerCase();
        });

        if (!isInTable) return totalObj;
        totalObj[name] = rowObj;
        return totalObj;
    }, {});

    letterStore.setProduction(production);
};
