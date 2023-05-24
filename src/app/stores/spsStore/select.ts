import spsStore from './spsStore';

export const selectSp = {
    // transport: () => spsStore.transport,
    transport: (codeName: string) => spsStore.transports[codeName],
    product: (codeName: string) => spsStore.production[codeName.toLowerCase()],
    vessel: (codeName: string) => spsStore.vessels[codeName],
    seller: (codeName: string) => spsStore.sellers[codeName],
    consignee: (codeName: string) => spsStore.consignees[codeName],
    portZarubezh: (codeName: string) => spsStore.portsZarubezh[codeName],
    portTamozhnya: (codeName: string) => spsStore.portsTamozhnya[codeName],
    contract: (code: number) => spsStore.contracts[code],
    podpisant: (codeName: string) => spsStore.podpisants[codeName],
    agent: (codeName: string) => spsStore.agents[codeName],
    bankProdavec: (codeName: string) => spsStore.banksProdavec[codeName],
    clientRu: (codeName: string) => spsStore.clientsRu[codeName],
    portRu: (codeName: string) => spsStore.portsRu[codeName],
    package: (codeName: string) => spsStore.packages[codeName],
    sortAssortiment: (codeName: string) => spsStore.sortsAssortiment[codeName.toLowerCase()],
};
