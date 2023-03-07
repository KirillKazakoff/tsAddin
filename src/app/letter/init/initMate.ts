import { initRange } from '../../utils/initRange';

export const initMate = (worksheets: Excel.WorksheetCollection) => {
    const { range, tableSrc } = initRange(worksheets, 'Коносаменты', 'Коносаменты');

    // const wsMate = worksheets.getItem('Коносаменты');
    // const tableSrc = wsMate.tables.getItem('Коносаменты');
    // const mateRange = tableSrc.getRange();

    tableSrc.load(['values', 'items', 'columns']);
    // mateRange.load('values');

    const transportCol = tableSrc.columns.getItem('Транспорт');
    transportCol.load('values');

    return { transportCol, mateRange: range };
};
