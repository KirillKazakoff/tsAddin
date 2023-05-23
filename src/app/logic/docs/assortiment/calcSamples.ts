export const calcSamples = (weight: number, pack: number) => {
    const getFloatSamples = () => {
        if (pack === 5) {
            if (weight < 1000) {
                return weight / 1000;
            }
            if (weight < 6000) {
                return weight / 2500;
            }
            if (weight < 12000) {
                return weight / 3000;
            }
            if (weight < 35000) {
                return weight / 5000;
            }
            return weight / 6000;
        }

        // if pack === 20
        if (weight < 1000) {
            return weight / 1000;
        }
        if (weight < 6000) {
            return weight / 3000;
        }
        if (weight < 15000) {
            return weight / 5000;
        }
        if (weight < 30000) {
            return weight / 7000;
        }
        return weight / 8000;
    };

    return Math.ceil(getFloatSamples());
};
