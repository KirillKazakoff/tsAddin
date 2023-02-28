export const initProduction = (worksheets: Excel.WorksheetCollection) => {
    const wsProduction = worksheets.getItem('Продукция');
    const tableSrc = wsProduction.tables.getItem('SPProductMSC');
    const spProductionRange = tableSrc.getRange();

    spProductionRange.load('values');
    return spProductionRange;
};
