/* eslint-disable no-param-reassign */
import tablesStore from '../../../stores/tablesStore/tablesStore';
import { SubjectT } from '../../../types/typesLetter';
import { groupify } from '../../utils/getGroup';
import { isStOff } from './isStOff';

export const getSubject = () => {
    const { matesT: mates } = tablesStore;

    const subjectObj = mates.reduce<SubjectT>((total, row) => {
        const { product, sort } = row;

        const sorts = groupify<string[]>(total, [], product.codeName);

        if (sorts.includes(sort)) return total;
        if (isStOff(sort)) return total;

        sorts.push(sort);
        return total;
    }, {});

    return subjectObj;
};
