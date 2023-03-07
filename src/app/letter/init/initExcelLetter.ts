import { initRange } from '../../utils/initRange';

export const initMate = (worksheets: Excel.WorksheetCollection) => {
    const { range, tableSrc } = initRange(worksheets, 'Коносаменты', 'Коносаменты');

    tableSrc.load(['values', 'items', 'columns']);

    const transportCol = tableSrc.columns.getItem('Транспорт');
    transportCol.load('values');

    return { transportCol, mateRange: range };
};

export const initTransport = (worksheets: Excel.WorksheetCollection) => {
    const { range } = initRange(worksheets, 'Транспорта', 'SPTransport');
    return range;
};

export const initVessels = (worksheets: Excel.WorksheetCollection) => {
    const { range } = initRange(worksheets, 'Суда', 'SPSudno');
    return range;
};

export const initProduction = (worksheets: Excel.WorksheetCollection) => {
    const { range } = initRange(worksheets, 'Продукция', 'SPProductMSC');
    return range;
};
