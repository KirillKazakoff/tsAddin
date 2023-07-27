// punctuation
export const p = {
    TAB: '   ',
    ITEM: '*  ',
};

export const formats = {
    priceDollar: '_("$"* #,##0.00_);_("$"* (#,##0.00);_("$"* "-"??_);_(@_)',
};

const mode = process.env.NODE_ENV;
const baseUrl = mode === 'production' ? 'https://kirillkazakoff.github.io/tsAddin/' : './';

export const pathObj = {
    bl: `${baseUrl}templates/BL.xlsx`,
    exportContract: `${baseUrl}templates/Export_Agreement.xlsx`,
    exportContractFCA: `${baseUrl}templates/Export_Agreement_FCA.xlsx`,
    exportStorageContract: `${baseUrl}templates/Export_Storage_Agreement.xlsx`,
    requestContractRu: `${baseUrl}templates/Request_Contract_Ru.xlsx`,
    requestContractNordmileRu: `${baseUrl}templates/Request_Contract_Ru_Nordmile.xlsx`,
    portLetter: `${baseUrl}templates/Port_Letter.xlsx`,
    portLetterFCA: `${baseUrl}templates/Port_Letter_FCA.xlsx`,
    InvoiceKTIDischarge: `${baseUrl}templates/Invoice_KTI_Discharge.xlsx`,
    invoiceKTIStorage: `${baseUrl}templates/Invoice_KTI_Storage.xlsx`,
    bg: {
        trk: `${baseUrl}assets/TRK.png`,
        msi: `${baseUrl}assets/MSI.png`,
    },
};
