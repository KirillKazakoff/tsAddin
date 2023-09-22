import { CellUtilsT } from '../../../types/typesExcelUtils';
import { getExcelDateStr } from '../../excel/utils/getExcelDate';
import { alignmentCenter, styleRowCells } from '../styleRowCells';
import { SalesContractT } from './groupBy/initSalesContract';

export const initSalesRowsDefault = (
    contract: SalesContractT,
    utils: CellUtilsT,
) => {
    const { bl } = contract.recordsGroupedBy;
    const cellName = 'Контракт_предмет_массив';
    const arrayCl = utils.getCell(cellName);
    let insertIndex = +arrayCl.row;

    // prettier-ignore
    Object.values(bl).forEach((group) => {
        const r = group.record;
        const header = {
            subject: [`- ${r.product.name}`],
            vessel: [`- ${r.vessel} via ${r.transport} (ETA ${r.port} ${getExcelDateStr(r.dateETA, 'en')})`],
            bl: [`- BL No: ${r.blNo} (Pack ${r.pack})`],
            titles: ['Grade', 'C/T', 'N/kg', 'Price/kg', 'Amount'],
        };

        [header.subject, header.vessel, header.bl].forEach((headerR) => {
            utils.ws.insertRow(insertIndex, headerR).commit();
            const headerRow = utils.ws.getRow(insertIndex);

            utils.mergeCells({ startCol: 1, endCol: 5, row: insertIndex });
            styleRowCells(headerRow, {
                alignment: { horizontal: 'left' },
                font: { name: 'Batang', size: 9, bold: true },
            });

            insertIndex += 1;
        });

        utils.ws.insertRow(insertIndex, header.titles).commit();
        const titleRow = utils.ws.getRow(insertIndex);
        styleRowCells(titleRow, {
            alignment: { horizontal: 'center' },
            font: { name: 'Batang', size: 9 },
        });
        insertIndex += 1;

        group.groupedProductsArr.forEach((groupProd) => {
            groupProd.rows.forEach((row) => {
                const fields = {
                    sort: row.sort,
                    places: row.amount.places.str,
                    placesTotal: row.amount.placesTotal.str,
                    price: `${row.amount.price.str} $`,
                    amount: `${row.amount.priceTotal.str} $`,
                };

                const rowArr = Object.values(fields);
                utils.ws.insertRow(insertIndex, rowArr).commit();

                const rowTable = utils.ws.getRow(insertIndex);
                styleRowCells(rowTable, {
                    alignment: alignmentCenter,
                    font: { name: 'Batang', size: 9 },
                });

                insertIndex += 1;
            });
        });

        const totalFields = {
            title: 'TOTAL',
            places: group.total.places.str,
            placesTotal: group.total.placesTotal.str,
            price: '-',
            priceTotal: `${group.total.priceTotal.str} $`,
        };

        const totalRow = utils.ws.insertRow(insertIndex, Object.values(totalFields));
        styleRowCells(totalRow, {
            alignment: alignmentCenter,
            font: { name: 'Batang', size: 9, bold: true },
        });

        insertIndex += 1;
        utils.ws.insertRow(insertIndex, ['']);
        insertIndex += 1;
    });

    utils.ws.spliceRows(insertIndex, 10);
};
