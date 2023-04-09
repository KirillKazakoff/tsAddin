import { CellObjT, CellUtilsT } from '../../../../../types/typesExcelUtils';

export const initComInvoiceEXW = (
    cells: CellObjT[],
    utils: CellUtilsT,
    terms: string
) => {
    if (terms === 'EXW') {
        cells.forEach((cellInfo) => {
            const cell = utils.getCell(cellInfo.cell);
            cell.value = '';

            const titleCl = utils.ws.getCell(+cell.row - 1, cell.col);
            titleCl.value = '';
        });
        utils.setCell({
            cell: 'Инвойс_декларация_п',
            value: '№ временной декларации на товары',
        });
        utils.setCell({
            cell: 'Инвойс_декларация',
            value: 'Temporary Customs Declaration',
        });
    }
};
