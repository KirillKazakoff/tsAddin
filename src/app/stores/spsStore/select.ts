import spsStore from './spsStore';

export const selectProductSp = (name: string) => {
    return spsStore.production[name];
};

export const selectVesselSp = (key: string) => {
    const { vessels } = spsStore;
    const vesselsArr = Object.values(vessels);

    return vesselsArr.find((vesselSp) => vesselSp.name === key);
};

export const selectVesselsStr = () => {
    return spsStore.vessels.map((vessel) => vessel.name);
};

export const selectVesselsStrEng = () => {
    return spsStore.vessels.map((vessel) => vessel.nameEng);
};

export const selectSellerSp = (name: string) => {
    return spsStore.sellers[name];
};

export const selectConsigneeSp = (name: string) => {
    return spsStore.consignees[name];
};
