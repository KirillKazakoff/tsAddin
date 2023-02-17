export const getUniqueVessels = (vessels: Excel.TableColumn) => {
    vessels.values.shift();
    const res = vessels.values.reduce((total, valArr) => {
        total.push(valArr[0]);
        return total;
    }, []);

    return Array.from(new Set(res));
};
