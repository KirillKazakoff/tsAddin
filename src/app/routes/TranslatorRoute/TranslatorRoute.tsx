import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

export const TranslatorRoute = observer(() => {
    const onClick = async () => {
        await Excel.run(async (context) => {
            const ws = context.workbook.worksheets.getItem('Инвойсы');
            const table = ws.tables.getItem('Инвойсы');

            table.load('rows');
            await context.sync();

            table.rows.items[0].set({
                values: [['11', 'a22', 'a33', 'a44', 'a55', 'a66', 'a77']],
            });

            await context.sync();
        });
    };
    useEffect(() => {
        onClick();
    });
    return (
        <button type='button' onClick={onClick}>
            hello
        </button>
    );
});
