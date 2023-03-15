/* eslint-disable no-param-reassign */
import { selectProductSp } from '../../../stores/spsStore/select';
import spsStore from '../../../stores/spsStore/spsStore';
import { getSubject } from '../common/getSubject';

export const subjectToStrRu = () => {
    const { transport } = spsStore;
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

    return `Предложение ${subjectStr} ${transport.name}`;
};

export const subjectToStrEng = () => {
    const { transport } = spsStore;
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

    return `Offer ${subjectStr} ${transport.nameEng}`;
};
