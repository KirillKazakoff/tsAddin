type InitRangeT = (
    worksheets: Excel.WorksheetCollection,
    wsName: string,
    tableName: string
) => Excel.Range;

const initRange: InitRangeT = (worksheets, wsName, tableName) => {
    const ws = worksheets.getItem(wsName);
    const tableSrc = ws.tables.getItem(tableName);

    const range = tableSrc.getRange();
    range.load('values');

    return range;
};

export default initRange;
