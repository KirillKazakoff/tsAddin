/* eslint-disable no-param-reassign */
export const getHeaderLetter = (vessels: string[]) => {
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

    return `${greeting}\n${info} ${vesselsStr}`;
};
