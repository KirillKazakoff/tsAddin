export const initVessels = (worksheets: Excel.WorksheetCollection) => {
    const wsVessels = worksheets.getItem('Суда');
    const tableSrc = wsVessels.tables.getItem('SPSudno');
    const spVesselsRange = tableSrc.getRange();

    spVesselsRange.load('values');
    return spVesselsRange;
};
