import { getTransport } from '../getTransport';
import letterStore from '../stores/letterStore';
import { transformTable } from '../transformTable';

export const useInitLetter = () => {
    const initLetter = async () => {
        Excel.run(async (context) => {
            const sheet = context.workbook.worksheets.getItem('Коносаменты');
            const tableSrc = sheet.tables.getItem('Коносаменты');
            const range = tableSrc.getRange();

            tableSrc.load(['values', 'items', 'columns']);
            range.load('values');

            const transportSrc = tableSrc.columns.getItem('Транспорт');
            transportSrc.load('values');

            await context.sync();

            const table = transformTable(range.values);
            const transport = getTransport(transportSrc.values);
            console.log(letterStore.letter.transport);

            letterStore.setTable(table);
            letterStore.setTransport(transport);
        });
    };
    return initLetter;
};
