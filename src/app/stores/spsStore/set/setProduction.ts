/* eslint-disable no-param-reassign */
import { ProductionNewT, ProductDescriptionT } from '../../../types/typesSP';
import spsStore from '../spsStore';

export const setProduction = (spRange: any[][]) => {
    const production = spRange.reduce<ProductionNewT>((totalObj, row) => {
        const [
            fullNameRu,
            nameEng,
            codeNameUncased,
            expirationDate,
            packRu,
            packEng,
            standart,
        ] = row;
        const codeName = codeNameUncased.toLowerCase();

        const rowObj: ProductDescriptionT = {
            codeName,
            eng: {
                name: nameEng,
                pack: packEng || 'No package',
            },
            ru: {
                name: fullNameRu,
                pack: packRu || 'Нет упаковки',
            },
            expirationDate: expirationDate || 'ХХХ',
            standart: standart || 'Нет стандарта',
        };

        totalObj[codeName] = rowObj;
        return totalObj;
    }, {});

    spsStore.setProduction(production);
};
