import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import tablesStore from '../../stores/tablesStore/tablesStore';
import { transformInput } from './transformInput';

export const TranslatorRoute = observer(() => {
    const onClick = async () => {
        await Excel.run(async (context) => {
            const ws = context.workbook.worksheets.getItem('Инвойсы');
            const table = ws.tables.getItem('Инвойсы');

            table.load('rows');
            await context.sync();

            const translators = [];
            tablesStore.translatorT.forEach((r, i) => {
                const transformed = transformInput(r.nameInput);
                const values = [
                    [
                        r.nameInput,
                        transformed.name,
                        transformed.suffix,
                        r.places,
                        r.pack,
                        r.price,
                        '=[@[Цена/ед]]*[@Количество]',
                    ],
                ];

                table.rows.items[i].set({ values });

                const valuesCopy = [...values];
                valuesCopy.pop();
                valuesCopy.push(r.priceTotal);

                translators.push(valuesCopy);
            });

            tablesStore.setTable(translators, 'translatorT');

            await context.sync();
        });
    };

    return (
        <button type='button' onClick={onClick}>
            hello
        </button>
    );
});
