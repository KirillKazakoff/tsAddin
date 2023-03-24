type InitRangeT = (
    worksheets: Excel.WorksheetCollection,
    wsName: string,
    tableName: string
) => Excel.Range;

export type InitRangeBoundT = (wsName: string, tableName: string) => Excel.Range;

export const initRange: InitRangeT = (worksheets, wsName, tableName) => {
    const ws = worksheets.getItem(wsName);
    const tableSrc = ws.tables.getItem(tableName);

    const range = tableSrc.getRange();
    range.load('values');

    return range;
};
