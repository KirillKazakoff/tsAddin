/* eslint-disable no-param-reassign */
import letterStore from '../../stores/letterStore';
import { selectProductSp } from '../../stores/select/selectProductSp';
import { getSubject } from '../getSubject';

export const getSubjectStrRu = () => {
    const { transport } = letterStore.letter;
    const subjectObj = getSubject();

    const subjectStr = Object.entries(subjectObj).reduce(
        (total, [productKey, sorts]) => {
            const productSp = selectProductSp(productKey);

            const sortsStr = sorts.join(', ');
            total = `${total}${productSp.name} ${sortsStr}; `;

            return total;
        },
        '',
    );

    return `Предложение ${subjectStr}, ${transport.name}`;
};

export const getSubjectStrEng = () => {
    const { transport } = letterStore.letter;
    const subjectObj = getSubject();

    const subjectStr = Object.entries(subjectObj).reduce(
        (total, [productKey, sorts]) => {
            const productSp = selectProductSp(productKey);

            const sortsStr = sorts.join(', ');
            total = `${total}${productSp.nameEng} ${sortsStr}; `;

            return total;
        },
        '',
    );

    return `Offer ${subjectStr}, ${transport.nameEng}`;
};
