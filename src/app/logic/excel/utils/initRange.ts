import { ExcelStoreT } from '../excelStoresDictionary';

type InitRangeT = (
    worksheets: Excel.WorksheetCollection,
    wsName: string,
    store: ExcelStoreT
) => Excel.Range | false;

export const initRange: InitRangeT = (worksheets, wsName, store) => {
    const { table, isJustRange } = store;

    const ws = worksheets.getItem(wsName);
    let range: Excel.Range;

    if (!isJustRange) {
        const src = ws.tables.getItem(store.table);
        range = src.getRange();
    } else {
        range = ws.getRange(table);
    }

    range.load('values');
    return range;
};
