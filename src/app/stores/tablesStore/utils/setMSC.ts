/* eslint-disable no-param-reassign */
import { ProductDescriptionT } from '../../../types/typesSP';

export const setMSC = (product: ProductDescriptionT) => {
    const { eng, ru } = product;

    ru.name = `MSC ${ru.name}`;
    eng.name = `MSC ${eng.name}`;
};
