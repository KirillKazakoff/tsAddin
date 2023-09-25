import salesContractStore from '../../../stores/docsStores/salesContractStore';
import { CellUtilsT } from '../../../types/typesExcelUtils';
import { SalesRowT } from '../../../types/typesTables';
import { alignmentCenter, styleRowCells } from '../styleRowCells';

type SettingsT = {
    rows: SalesRowT[];
    utils: CellUtilsT;
    isContract: boolean;
};
export const initSalesTableRows = (settings: SettingsT) => {
    const { rows, utils, isContract } = settings;
    const cellName = isContract
        ? 'Контракт_предмет_массив'
        : 'Инвойс_предмет_массив';
    const fontSize = isContract ? 9 : 11;
    const arrayCl = utils.getCell(cellName);

    rows.forEach((r, i) => {
        const filling = r.isLive
            ? `\nFilling: ${salesContractStore.fields.filling}`
            : '';
        const cols = {
            bl: r.blNo,
            product: `${r.product.name}${filling}`,
            vessel: r.vessel,
            sort: r.sort,
            price: `${r.amount.price.str} $`,
            placesTotal: r.amount.placesTotal.str,
            priceTotal: `${r.amount.priceTotal.str} $`,
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
            border: { bottom: { style: 'thin' } },
        });

        row.getCell(1).border = {
            bottom: { style: 'thin' },
            left: { style: 'thin' },
        };
        row.getCell(row.actualCellCount).border = {
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
    });

    utils.deleteRow(cellName);
};
