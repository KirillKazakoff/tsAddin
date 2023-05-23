/* eslint-disable no-param-reassign */
import { selectSp } from '../../../stores/spsStore/select';
import spsStore from '../../../stores/spsStore/spsStore';
import { getSubject } from '../common/getSubject';

export const subjectToStrRu = () => {
    const { transport } = spsStore;
    const subjectObj = getSubject();

    const subjectStr = Object.entries(subjectObj).reduce(
        (total, [productKey, sorts]) => {
            const productSp = selectSp.product(productKey);

            const sortsStr = sorts.join(', ');
            total = `${total}${productSp.ru.name} ${sortsStr}; `;

            return total;
        },
        '',
    );

    return `Предложение ${subjectStr} ${transport.ru.name}`;
};

export const subjectToStrEng = () => {
    const { transport } = spsStore;
    const subjectObj = getSubject();

    const subjectStr = Object.entries(subjectObj).reduce(
        (total, [productKey, sorts]) => {
            const productSp = selectSp.product(productKey);

            const sortsStr = sorts.join(', ');
            total = `${total}${productSp.eng.name} ${sortsStr}; `;

            return total;
        },
        '',
    );

    return `Offer ${subjectStr} ${transport.eng.name}`;
};
