import React, { useEffect } from 'react';
import { getBody } from './letter/getBody';
import { getHeaderLetter } from './letter/getHeader';

export default function App() {
    const onClick = async () => {
        await Excel.run(async (context) => {
            const sheet = context.workbook.worksheets.getItem('Sheet1');
            const table = sheet.tables.getItem('Коносаменты');
            const range = table.getRange();

            table.load(['values', 'items', 'columns']);
            range.load('values');

            const vessels = table.columns.getItem('Судно');
            const transport = table.columns.getItem('Транспорт');
            vessels.load('values');
            transport.load('values');

            await context.sync();
            const headerLetter = getHeaderLetter(vessels.values, transport.values);
            console.log(headerLetter);
            const bodyLetter = getBody(range.values, vessels.values);
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
