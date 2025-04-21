/* eslint-disable no-useless-escape */
import { setTable } from './setTable';

export const setTranslator = (table: any[][]) => {
    const res = setTable({
        table,
        type: 'translatorT',
        headers: {
            nameInput: 'Товар',
            name: 'Наименование',
            suffix: 'Приставка',
            places: 'Количество',
            pack: 'Упаковка',
            price: 'Цена/ед',
            priceTotal: 'Стоимость',
        },
        row: (r) => {
            const regexp = /([а-я А-Я A-Z a-z]+)(([-\/\s,(;]+)?([\d]+)?(.+)?)/;
            let splitted = r.nameInput.toString().match(regexp);
            if (!splitted) splitted = ['', r.nameInput.toString(), r.suffix.toString()];

            const row = {
                nameInput: r.nameInput as string,
                name: splitted[1].trim() as string,
                suffix: splitted[2].trim(),
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
