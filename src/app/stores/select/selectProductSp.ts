import letterStore from '../letterStore';

export const selectProductSp = (key: string) => {
    const { production } = letterStore.letter;
    const productionArr = Object.values(production);

    return productionArr.find((productSp) => productSp.name === key);
};

export const selectVesselSp = (key: string) => {
    const { vessels } = letterStore.letter;
    const vesselsArr = Object.values(vessels);

    return vesselsArr.find((vesselSp) => vesselSp.name === key);
};

// export const selectProductName = (key: string) => {
//     const product = selectProductSp(key);

// }
