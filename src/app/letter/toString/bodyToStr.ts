import { selectVesselsStr } from '../../stores/spsStore/select';
import tablesStore from '../../stores/tablesStore/tablesStore';
import { ProductionToStr } from '../../types/types';
import { getBody } from '../common/getBody';
import { productToStringEng, productToStringRu } from './productToStr';

/* eslint-disable no-param-reassign */
const productionToStr: ProductionToStr = (bodyRow, callback) => {
    const { production } = bodyRow;

    const productionValues = Object.values(production);
    const productionStr = productionValues.reduce((total, prodVal) => {
        total = `${total}${callback(prodVal)}`;
        return total;
    }, '');

    return productionStr;
};

export const bodyToStrRu = () => {
    const { mates } = tablesStore;
    const vessels = selectVesselsStr();
    const bodyObj = getBody(mates, vessels);

    const body = bodyObj.reduce((bodyStr, bodyRow) => {
        const { vessel } = bodyRow;
        const productionStr = productionToStr(bodyRow, productToStringRu);

        bodyStr = `\n${bodyStr}${vessel.name}\n${productionStr}`;

        return bodyStr;
    }, '');

    return body;
};

export const bodyToStrEng = () => {
    const { mates } = tablesStore;
    const vessels = selectVesselsStr();
    const bodyObj = getBody(mates, vessels);

    const body = bodyObj.reduce((bodyStr, bodyRow) => {
        const { vessel } = bodyRow;
        const productionStr = productionToStr(bodyRow, productToStringEng);

        bodyStr = `\n${bodyStr}${vessel.nameEng}\n${productionStr}`;

        return bodyStr;
    }, '');

    return body;
};
