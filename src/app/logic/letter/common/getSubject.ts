/* eslint-disable no-param-reassign */
import tablesStore from '../../../stores/tablesStore/tablesStore';
import { SubjectT } from '../../../types/types';
import { checkOperation } from './checkOperation';
import { isStOff } from './isSameSort';

export const getSubject = () => {
    const { mates } = tablesStore;

    const subjectObj = mates.reduce<SubjectT>((total, row) => {
        const { product, sort } = row;

        if (!checkOperation(row)) return total;
        if (!total[product]) {
            total[product] = [];
        }

        if (total[product].includes(sort)) return total;
        if (isStOff(sort)) return total;

        total[product].push(sort);
        return total;
    }, {});

    return subjectObj;
};
