export const initRange = (
    worksheets: Excel.WorksheetCollection,
    wsName: string,
    tableName: string,
) => {
    const ws = worksheets.getItem(wsName);
    const tableSrc = ws.tables.getItem(tableName);
    const range = tableSrc.getRange();

    range.load('values');
    return { range, tableSrc };
};
