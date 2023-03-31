/* eslint-disable no-param-reassign */
import { ProductDescriptionT } from '../../../types/typesSP';

export const setMSC = (product: ProductDescriptionT) => {
    const { fullName, nameEng } = product;

    product.fullName = `MSC ${fullName}`;
    product.nameEng = `MSC ${nameEng}`;
};
