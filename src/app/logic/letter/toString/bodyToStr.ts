import tablesStore from '../../../stores/tablesStore/tablesStore';
import { ProductionToStr } from '../../../types/typesLetter';
import { getBody } from '../common/getBody';
import { getFilteredVessels } from '../common/getFilteredVessels';
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
    const { matesT: mates } = tablesStore;
    const vessels = getFilteredVessels();

    const bodyObj = getBody(mates, vessels);

    const body = bodyObj.reduce((bodyStr, bodyRow) => {
        const { vessel } = bodyRow;
        const productionStr = productionToStr(bodyRow, productToStringRu);

        bodyStr = `\n${bodyStr}${vessel.ru.name}\n${productionStr}`;

        return bodyStr;
    }, '');

    return body;
};

export const bodyToStrEng = () => {
    const { matesT: mates } = tablesStore;
    const vessels = getFilteredVessels();
    const bodyObj = getBody(mates, vessels);

    const body = bodyObj.reduce((bodyStr, bodyRow) => {
        const { vessel } = bodyRow;
        const productionStr = productionToStr(bodyRow, productToStringEng);

        bodyStr = `\n${bodyStr}${vessel.eng.name}\n${productionStr}`;

        return bodyStr;
    }, '');

    return body;
};
