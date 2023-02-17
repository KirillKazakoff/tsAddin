/* eslint-disable global-require */
/* eslint-disable class-methods-use-this */
import React, { useEffect } from 'react';
import { getUniqueVessels } from './getUniqueVessels';
import { transformObject } from './transformObject';

export default function App() {
    const onClick = async () => {
        await Excel.run(async (context) => {
            const sheet = context.workbook.worksheets.getItem('Sheet1');
            const table = sheet.tables.getItem('Коносаменты');
            const range = table.getRange();

            table.load(['values', 'items', 'columns']);
            range.load('values');

            await context.sync();

            const transformedTable = transformObject(range.values);
            const vessels = table.columns.getItem('Судно');
            vessels.load('values');

            await context.sync();
            const uniqueVessels = getUniqueVessels(vessels);
            console.log(uniqueVessels);
            console.log(transformedTable);
        });
    };

    useEffect(() => {
        onClick();
    });

    return (
        <div>
            <button type='button' onClick={onClick}>
                <a href='mailto:test@example.com?subject=Testing out mailto!&body=This is only a test!'>
                    Second Example
                </a>
            </button>
        </div>
    );
}
