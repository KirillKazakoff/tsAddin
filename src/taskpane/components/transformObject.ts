export const transformObject = (table: any[][]) => {
    return table.reduce((totalObj, row, index) => {
        if (index === 0) return totalObj;
        const [
            reice,
            konosament,
            date,
            vessel,
            transport,
            company,
            product,
            sort,
            pack,
            amount,
            total,
        ] = row;
        const rowObj = {
            reice,
            konosament,
            date,
            vessel,
            transport,
            company,
            product,
            sort,
            pack,
            amount,
            total,
        };
        totalObj.push(rowObj);
        return totalObj;
    }, []);
};
