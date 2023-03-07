import { initRange } from '../../utils/initRange';

export const initExport = (worksheets: Excel.WorksheetCollection) => {
    const { range } = initRange(worksheets, 'Экспорт', 'Экспорт');
    return range;
};
