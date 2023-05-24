/* eslint-disable no-param-reassign */
import letterStore from '../../../stores/letterStore/letterStore';
import { selectSp } from '../../../stores/spsStore/select';
import { getSubject } from '../common/getSubject';

export const subjectToStrRu = () => {
    const transport = letterStore.fields.transport.ru.name;
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

    return `Предложение ${subjectStr} ${transport}`;
};

export const subjectToStrEng = () => {
    const transport = letterStore.fields.transport.eng.name;
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

    return `Offer ${subjectStr} ${transport}`;
};
