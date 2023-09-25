import salesContractStore from '../../../stores/docsStores/salesContractStore';
import { CellUtilsT } from '../../../types/typesExcelUtils';
import { SalesRowT } from '../../../types/typesTables';
import { alignmentCenter, styleRowCells } from '../styleRowCells';

type SettingsT = {
    rows: SalesRowT[];
    utils: CellUtilsT;
    isContract: boolean;
};
export const initSalesRowsLive = (settings: SettingsT) => {
    const { rows, utils, isContract } = settings;
    const cellName = isContract
        ? 'Контракт_предмет_массив'
        : 'Инвойс_предмет_массив';
    const fontSize = isContract ? 9 : 11;
    const arrayCl = utils.getCell(cellName);

    rows.forEach((r, i) => {
        const cols = {
            bl: r.blNo,
            product: `${r.product.name}\nFilling: ${salesContractStore.fields.filling}`,
            vessel: r.vessel,
            sort: r.sort,
            price: r.amount.price.str,
            placesTotal: r.amount.placesTotal.str,
            priceTotal: r.amount.priceTotal.str,
        };

        if (isContract) {
            delete cols.bl;
            delete cols.vessel;
        }

        const rowArr = Object.values(cols);
        const rowIndex = +arrayCl.row + i;
        utils.ws.insertRow(rowIndex, rowArr).commit();

        const row = utils.ws.getRow(rowIndex);

        styleRowCells(row, {
            height: 40,
            alignment: alignmentCenter,
            font: { size: fontSize, name: 'Batang' },
        });

        row.getCell(1).border = { left: { style: 'thin' } };
        row.getCell(row.actualCellCount).border = { right: { style: 'thin' } };
    });

    utils.deleteRow(cellName);
};
