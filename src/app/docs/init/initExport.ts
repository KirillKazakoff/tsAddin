export const initExport = (worksheets: Excel.WorksheetCollection) => {
    const wsExport = worksheets.getItem('Экспорт');
    const tableSrc = wsExport.tables.getItem('Экспорт');
    const exportRange = tableSrc.getRange();

    exportRange.load('values');
    return exportRange;
};
