import spsStore from './spsStore';

export const selectTransportSp = () => {
    return spsStore.transport;
};

export const selectProductSp = (codeName: string) => {
    return spsStore.production[codeName.toLowerCase()];
};

export const selectVesselSp = (codeName: string) => {
    return spsStore.vessels[codeName];
};

export const selectSellerSp = (codeName: string) => {
    return spsStore.sellers[codeName];
};

export const selectConsigneeSp = (codeName: string) => {
    return spsStore.consignees[codeName];
};

export const selectPortZarubezhSp = (codeName: string) => {
    return spsStore.portsZarubezh[codeName];
};

export const selectPortTamozhnyaSp = (codeName: string) => {
    return spsStore.portsTamozhnya[codeName];
};

export const selectContractSp = (code: number) => {
    return spsStore.contracts[code];
};

export const selectPodpisantSp = (codeName: string) => {
    return spsStore.podpisants[codeName];
};

export const selectAgentSp = (codeName: string) => {
    return spsStore.agents[codeName];
};

export const selectBankProdavecSp = (codeName: string) => {
    return spsStore.banksProdavec[codeName];
};

export const selectClientRuSp = (codeName: string) => {
    return spsStore.clientsRu[codeName];
};

export const selectPortRuSp = (codeName: string) => {
    return spsStore.portsRu[codeName];
};

export const selectPackageSp = (
    vesselName: string,
    productName: string,
    pack: number,
) => {
    const codeName = `${vesselName}${productName}${pack}`;
    return spsStore.packages[codeName];
};
