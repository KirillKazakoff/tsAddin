/* eslint-disable no-param-reassign */
import { getTransport } from '../getTransport';
import { transformTable } from '../transformTable';
import { SubjectT } from '../types/types';

export const getSubject = (srcTable: any[][], transportSrc: any[][]) => {
    const transport = getTransport(transportSrc);
    const table = transformTable(srcTable);

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
