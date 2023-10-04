import salesContractStore from '../../../stores/docsStores/salesContractStore';
import { CellUtilsT } from '../../../types/typesExcelUtils';
import { SalesRowT } from '../../../types/typesTables';
import { setFormats } from '../../utils/formats';
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
        const fields = {
            bl: r.blNo,
            product: `${r.product.name}${filling}`,
            vessel: r.vessel,
            sort: r.sort,
            price: r.amount.price.count,
            placesTotal: r.amount.placesTotal.count,
            priceTotal: r.amount.priceTotal.count,
        };

        if (isContract) {
            delete fields.bl;
            delete fields.vessel;
        }

        const rowIndex = +arrayCl.row + i;
        const row = utils.ws.insertRow(rowIndex, Object.values(fields));
        setFormats(row, fields, 'sales');

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
