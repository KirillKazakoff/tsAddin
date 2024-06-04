// punctuation
export const p = {
    TAB: '   ',
    ITEM: '*  ',
};

const mode = process.env.NODE_ENV;
const baseUrl = mode === 'production' ? 'https://kirillkazakoff.github.io/tsAddin/' : './';

export const pathObj = {
    fesco: `${baseUrl}templates/Fesco_Letter.xlsx`,
    newBl: `${baseUrl}templates/BL_New.xlsx`,
    exportContract: `${baseUrl}templates/Export_Agreement.xlsx`,
    exportContractFCA: `${baseUrl}templates/Export_Agreement_FCA.xlsx`,
    exportStorageContract: `${baseUrl}templates/Export_Storage_Agreement.xlsx`,
    innerContract: `${baseUrl}templates/Inner_Contract.xlsx`,
    requestContractRu: `${baseUrl}templates/Request_Contract_Ru.xlsx`,
    requestContractNordmileRu: `${baseUrl}templates/Request_Contract_Ru_Nordmile.xlsx`,
    portLetter: `${baseUrl}templates/Port_Letter.xlsx`,
    invoiceKTIDischarge: `${baseUrl}templates/Invoice_KTI_Discharge.xlsx`,
    salesContract: `${baseUrl}templates/Sales_Purchase_Contract.xlsx`,
    salesContractLive: `${baseUrl}templates/Sales_Purchase_Contract_Live.xlsx`,
    pictures: {
        trk: `${baseUrl}assets/TRK.png`,
        msi: `${baseUrl}assets/MSI.png`,
        kti: `${baseUrl}assets/KTI_LOGO.png`,
        bell: `${baseUrl}assets/bell.svg`,
    },
};

export type PathKeyT = keyof typeof pathObj;
