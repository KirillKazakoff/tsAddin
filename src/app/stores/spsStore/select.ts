import spsStore from './spsStore';

export const selectProductSp = (name: string) => {
    return spsStore.production[name.toLowerCase()];
};

export const selectVesselSp = (name: string) => {
    return spsStore.vessels[name];
};

export const selectVesselsStr = () => {
    return Object.values(spsStore.vessels).map((vessel) => vessel.name);
};

export const selectVesselsStrEng = () => {
    return Object.values(spsStore.vessels).map((vessel) => vessel.nameEng);
};

export const selectSellerSp = (name: string) => {
    return spsStore.sellers[name];
};

export const selectConsigneeSp = (name: string) => {
    return spsStore.consignees[name];
};

export const selectTransportSp = () => {
    return spsStore.transport;
};
