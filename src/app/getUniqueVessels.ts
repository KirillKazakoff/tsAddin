export const getUniqueVessels = (vessels: any[][]) => {
    vessels.shift();
    const res = vessels.reduce((total, valArr) => {
        total.push(valArr[0]);
        return total;
    }, []);

    return Array.from(new Set(res));
};
