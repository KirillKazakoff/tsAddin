import initRange from './initRange';

// tablesInit
export const initExport = (worksheets: Excel.WorksheetCollection) => {
    return initRange(worksheets, 'Экспорт', 'Экспорт');
};

export const initExportStorage = (worksheets: Excel.WorksheetCollection) => {
    return initRange(worksheets, 'Экспорт Хранение', 'Экспорт_хранение');
};

export const initInner = (worksheets: Excel.WorksheetCollection) => {
    return initRange(worksheets, 'Внутренний рынок', 'Продажи_ВР');
};

export const initMate = (worksheets: Excel.WorksheetCollection) => {
    return initRange(worksheets, 'Коносаменты', 'Коносаменты');
};

// spInit
export const initTransport = (worksheets: Excel.WorksheetCollection) => {
    return initRange(worksheets, 'Транспорта', 'SPTransport');
};

export const initVessels = (worksheets: Excel.WorksheetCollection) => {
    return initRange(worksheets, 'Суда', 'SPSudno');
};

export const initProduction = (worksheets: Excel.WorksheetCollection) => {
    return initRange(worksheets, 'Продукция', 'SPProductMSC');
};

export const initSeller = (worksheets: Excel.WorksheetCollection) => {
    return initRange(worksheets, 'Продавец', 'SPProdavec');
};

export const initConsignee = (worksheets: Excel.WorksheetCollection) => {
    return initRange(worksheets, 'SP_Consignee', 'SP_Consignee');
};

export const initPortZarubezh = (worksheets: Excel.WorksheetCollection) => {
    return initRange(worksheets, 'SPPortZarubezh', 'SPPortZarubezh');
};

export const initPortTamozhnya = (worksheets: Excel.WorksheetCollection) => {
    return initRange(worksheets, 'SPTamozhnya', 'SPTamozhnya');
};
