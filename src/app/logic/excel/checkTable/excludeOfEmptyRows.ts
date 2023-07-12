export const excludeOfEmptyRows = (table: any[][]) => {
    const excludedValues = ['-', ' ', '-M', '-T', '#N/A'];
    const excludedTable = table.reduce<any[][]>((total, row) => {
        const isEmpty = row.every(
            (value) => !value || excludedValues.includes(value),
        );
        if (isEmpty) return total;

        total.push(row);
        return total;
    }, []);

    return excludedTable;
};
