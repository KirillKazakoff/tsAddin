/* eslint-disable no-param-reassign */
/* eslint-disable global-require */
/* eslint-disable class-methods-use-this */
import React, { useEffect } from 'react';
import { getUniqueVessels } from './getUniqueVessels';
import { getHeaderLetter } from './letter/getHeaderLetter';
import { transformByProduct } from './letter/transformByProduct';
import { transformTable } from './transformTable';
import { TableRowT } from './types/types';

export default function App() {
    const onClick = async () => {
        await Excel.run(async (context) => {
            const sheet = context.workbook.worksheets.getItem('Sheet1');
            const table = sheet.tables.getItem('Коносаменты');
            const range = table.getRange();

            table.load(['values', 'items', 'columns']);
            range.load('values');

            const vessels = table.columns.getItem('Судно');
            vessels.load('values');

            await context.sync();

            const transformedTable = transformTable(range.values);
            const uniqueVessels = getUniqueVessels(vessels);
            const letter = getHeaderLetter(uniqueVessels);

            const groupedByVessel = uniqueVessels.reduce<TableRowT[][]>(
                (rowsByVessel, vessel) => {
                    const group = transformedTable.reduce<TableRowT[]>(
                        (total, row) => {
                            if (vessel === row.vessel) total.push(row);
                            return total;
                        },
                        [],
                    );

                    rowsByVessel.push(group);
                    return rowsByVessel;
                },
                [],
            );

            console.log(groupedByVessel);
            groupedByVessel.forEach((group) => {
                const productGrouped = transformByProduct(group);
                console.log(productGrouped);
            });
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
