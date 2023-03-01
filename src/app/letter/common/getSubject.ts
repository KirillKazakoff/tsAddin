/* eslint-disable no-param-reassign */
import letterStore from '../../stores/letterStore/letterStore';
import { SubjectT } from '../../types/types';

export const getSubject = () => {
    const { table } = letterStore.letter;
    const subjectObj = table.reduce<SubjectT>((total, row) => {
        const { product, sort } = row;
        if (!total[product]) {
            total[product] = [];
        }
        if (total[product].includes(sort)) return total;

        total[product].push(sort);
        return total;
    }, {});

    return subjectObj;
};
