export const excludeOfEmptyRows = (table: any[][]) => {
    const excludedValues = [1, '-', ' ', '-M', '-T', '#N/A', '----', '#CALC', '#VALUE'];
    const excludedTable = table.reduce<any[][]>((total, row) => {
        const isEmpty = row.every(
            (value) => !value || excludedValues.some((exVal) => value.toString().includes(exVal)),
        );
        if (isEmpty) {
            return total;
        }

        total.push(row);
        return total;
    }, []);

    return excludedTable;
};
