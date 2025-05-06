/* eslint-disable no-useless-escape */
import { setTable } from './setTable';

export const setTranslator = (table: any[][]) => {
    const res = setTable({
        table,
        type: 'translatorT',
        headers: {
            nameInput: 'Товар',
            name: 'Наименование',
            rus: 'Перевод',
            suffix: 'Приставка',
            places: 'Количество',
            pack: 'Упаковка',
            price: 'Цена/ед',
            priceTotal: 'Стоимость',
        },
        row: (r) => {
            const row = {
                nameInput: r.nameInput.toString() as string,
                name: r.name as string,
                suffix: r.suffix,
                rus: r.rus,
                places: r.places,
                pack: r.pack,
                price: r.price,
                priceTotal: r.priceTotal,
            };
            return row;
        },
    });

    return res;
};

export type TranslatorRowT = ReturnType<typeof setTranslator>['transformedTable'][number];
