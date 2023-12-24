/* eslint-disable no-param-reassign */
import tablesStore from '../../../stores/tablesStore/tablesStore';
import { SubjectT } from '../../../types/typesLetter';
import { groupify } from '../../utils/groupify/groupify';
import { isStOff } from './isStOff';

export const getSubject = () => {
    const { matesT: mates } = tablesStore;

    const subjectObj = mates.reduce<SubjectT>((total, row) => {
        const { product, sort } = row;

        const sorts = groupify<string[]>(total, [], product.code);

        if (sorts.includes(sort)) return total;
        if (isStOff(sort)) return total;

        sorts.push(sort);
        return total;
    }, {});

    return subjectObj;
};
