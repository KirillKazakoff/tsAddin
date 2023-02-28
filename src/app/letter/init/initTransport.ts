export const initTransport = (worksheets: Excel.WorksheetCollection) => {
    const wsTransport = worksheets.getItem('Транспорта');
    const tableSrc = wsTransport.tables.getItem('SPTransport');
    const spTransportRange = tableSrc.getRange();

    spTransportRange.load('values');
    return spTransportRange;
};
