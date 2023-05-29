import { CellObjT, CellUtilsT } from '../../../../../types/typesExcelUtils';

export const initComInvoiceTerms = (
    cells: CellObjT[],
    utils: CellUtilsT,
    terms: string,
) => {
    const spliceCells = [];

    if (terms === 'EXW') {
        const cellsEXW = [
            'Инвойс_декларация',
            'Инвойс_дата',
            'Инвойс_транспорт',
            'Инвойс_куда',
            'Инвойс_откуда',

            'Инвойс_декларация_п',
            'Инвойс_дата_п',
            'Инвойс_транспорт_п',
            'Инвойс_куда_п',
            'Инвойс_откуда_п',
        ];
        // reset departure fields
        cellsEXW.forEach((name) => {
            const cell = utils.getCell(name);
            cell.value = '';

            const titleCl = utils.ws.getCell(+cell.row - 1, cell.col);
            titleCl.value = '';
        });

        // setDeclarationFields
        utils.setCell({
            cell: 'Инвойс_декларация_п',
            value: '№ временной декларации на товары',
        });
        utils.setCell({
            cell: 'Инвойс_декларация',
            value: 'Temporary Customs Declaration',
        });

        spliceCells.push(...cellsEXW);
    }

    if (terms === 'FCA') {
        console.log('FCA');
        spliceCells.push(
            'Инвойс_подвал_места',
            'Инвойс_подвал_места_п',
            'Инвойс_откуда',
            'Инвойс_откуда_п',
        );
    }

    // filter spliced cells
    const filtered = cells.filter((cell) => !spliceCells.includes(cell.cell));
    console.log(filtered);
    console.log(terms);
    return filtered;
};
