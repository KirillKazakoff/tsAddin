/* eslint-disable no-param-reassign */
import { SubjectT, TableRowT } from '../types/types';

export const getSubject = (table: TableRowT[], transport: string) => {
    const subjectObj = table.reduce<SubjectT>((total, row) => {
        const { product, sort } = row;
        if (!total[product]) {
            total[product] = [];
        }
        if (total[product].includes(sort)) return total;

        total[product].push(sort);
        return total;
    }, {});

    const subjectProductionStr = Object.entries(subjectObj).reduce(
        (total, [product, sorts]) => {
            const sortsStr = sorts.join(', ');
            total = `${total}${product} ${sortsStr}; `;

            return total;
        },
        '',
    );

    const subject = `Предложение ${subjectProductionStr}${transport}`;
    return subject;
};
