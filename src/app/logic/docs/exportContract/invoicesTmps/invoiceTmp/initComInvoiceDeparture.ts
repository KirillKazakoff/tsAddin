import { CellObjT, CellUtilsT } from '../../../../../types/typesExcelUtils';

export const initComInvoiceDeparture = (
    cells: CellObjT[],
    utils: CellUtilsT,
    terms: string,
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
    if (terms === 'FCA') {
        utils.setCell({ cell: 'Инвойс_откуда', value: '' });
        utils.setCell({ cell: 'Инвойс_откуда', value: '', offsetRow: -1 });
        utils.setCell({ cell: 'Инвойс_откуда_п', value: '' });
        utils.setCell({ cell: 'Инвойс_откуда_п', value: '', offsetRow: -1 });
    }
};
