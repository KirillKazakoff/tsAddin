/* eslint-disable no-param-reassign */
import { ProductionsT, ProductionT } from '../../../types/typesSP';
import spsStore from '../spsStore';

export const setProduction = (spRange: any[][]) => {
    const production = spRange.reduce<ProductionsT>((total, row) => {
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

        const rowObj: ProductionT = {
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

        total[codeName] = rowObj;
        return total;
    }, {});

    spsStore.setSp.production(production);
};
