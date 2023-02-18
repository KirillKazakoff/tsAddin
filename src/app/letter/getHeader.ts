import { getTransport } from '../getTransport';
import { getUniqueVessels } from '../getUniqueVessels';

/* eslint-disable no-param-reassign */
export const getHeaderLetter = (vesselsSrc: any[][], transportSrc: any[][]) => {
    const vessels = getUniqueVessels(vesselsSrc);
    const greeting = 'Добрый день!';
    const info = 'Направляем информацию по новой партии продукции';

    const vesselsStr = vessels.reduce((total, vessel, i) => {
        if (i === vessels.length - 1) {
            total += vessel;
            return total;
        }

        total = `${total}${vessel}; `;
        return total;
    }, '');

    const transport = getTransport(transportSrc);

    return `${greeting}\n${info} ${vesselsStr}\n${transport}`;
};
