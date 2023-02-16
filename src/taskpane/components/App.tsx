/* eslint-disable global-require */
/* eslint-disable class-methods-use-this */
import React from 'react';
import { transformObject } from './transformObject';

export default function App() {
    const onClick = async () => {
        await Excel.run(async (context) => {
            const sheet = context.workbook.worksheets.getItem('Sheet1');
            const table = sheet.tables.getItem('Коносаменты');
            const range = table.getRange();
            range.load('values');
            await context.sync();

            const { values } = range;
            const transformed = transformObject(values);
            console.log(transformed);
        });
    };

    return (
        <button type='button' onClick={onClick}>
            Hello
        </button>
    );
}
