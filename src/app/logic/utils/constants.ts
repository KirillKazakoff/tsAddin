// punctuation
export const p = {
    TAB: '   ',
    ITEM: '*  ',
};

const mode = process.env.NODE_ENV;
const baseUrl = mode === 'production' ? 'https://kirillkazakoff.github.io/tsAddin/' : './';

export const pathObj = {
    bl: `${baseUrl}templates/BL.xlsx`,
    exportContract: `${baseUrl}templates/Export_Agreement_Vessels.xlsx`,
    exportStorageContract: `${baseUrl}templates/Export_Storage_Agreement.xlsx`,
    exportContractFCA: `${baseUrl}templates/Export_Agreement_FCA.xlsx`,
    requestContractRu: `${baseUrl}templates/Request_Contract_Ru.xlsx`,
    portLetter: `${baseUrl}templates/Port_Letter.xlsx`,
    bg: {
        trk: `${baseUrl}assets/TRK.png`,
        msi: `${baseUrl}assets/MSI.png`,
    },
};
