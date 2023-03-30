import spsStore from './spsStore';

export const selectTransportSp = () => {
    return spsStore.transport;
};

export const selectProductSp = (name: string) => {
    return spsStore.production[name.toLowerCase()];
};

export const selectVesselSp = (name: string) => {
    return spsStore.vessels[name];
};

export const selectSellerSp = (name: string) => {
    return spsStore.sellers[name];
};

export const selectConsigneeSp = (name: string) => {
    return spsStore.consignees[name];
};

export const selectPortZarubezhSp = (name: string) => {
    return spsStore.portsZarubezh[name];
};

export const selectPortTamozhnyaSp = (name: string) => {
    return spsStore.portsTamozhnya[name];
};

export const selectContractSp = (code: number) => {
    return spsStore.contracts[code];
};

export const selectPodpisantSp = (name: string) => {
    return spsStore.podpisants[name];
};

export const selectAgentSp = (name: string) => {
    return spsStore.agents[name];
};

export const selectBankProdavecSp = (name: string) => {
    return spsStore.banksProdavec[name];
};
