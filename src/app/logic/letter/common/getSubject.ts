/* eslint-disable no-param-reassign */
import tablesStore from '../../../stores/tablesStore/tablesStore';
import { SubjectT } from '../../../types/typesLetter';
import { isStOff } from './isStOff';

export const getSubject = () => {
    const { matesT: mates } = tablesStore;

    const subjectObj = mates.reduce<SubjectT>((total, row) => {
        const { product, sort } = row;

        let sorts = total[product.codeName];
        if (!sorts) {
            sorts = [];
            total[product.codeName] = sorts;
        }

        if (sorts.includes(sort)) return total;
        if (isStOff(sort)) return total;

        sorts.push(sort);
        return total;
    }, {});

    return subjectObj;
};
