import { CellUtilsT } from '../../../types/typesExcelUtils';
import { getExcelDateStr } from '../../excel/utils/getExcelDate';
import { alignmentCenter, styleRowCells } from '../styleRowCells';
import { SalesContractT } from './groupBy/initSalesContract';

export const initSalesRowsDefault = (
    contract: SalesContractT,
    utils: CellUtilsT,
) => {
    const { bl } = contract.recordsGroupedBy;

    // prettier-ignore
    Object.values(bl).forEach((group) => {
        const r = group.record;
        const header = {
            subject: [`- ${r.product.name}`],
            vessel: [`- ${r.vessel} via ${r.transport} (ETA ${r.port} ${getExcelDateStr(r.dateETA, 'en')})`],
            bl: [`BL No: ${r.blNo} (Pack ${r.pack})`],
            titles: ['Grade', 'C/T', 'N/kg', 'Price/kg', 'Amount'],
        };

        utils.ws.addRows(Object.values(header));

        group.rows.forEach((row, i) => {
            const fields = {
                sort: row.record.sort,
                places: row.record.amount.places.str,
                placesTotal: row.record.amount.placesTotal.str,
                price: `${row.record.amount.price.str} $`,
                amount: row.record.amount.priceTotal.str,
            };
            const rowTable = utils.ws.addRow(Object.values(fields));
            styleRowCells(rowTable, {
                alignment: alignmentCenter,
            });
        });

        const totalFields = {
            title: 'TOTAL',
            places: group.total.places.str,
            placesTotal: group.total.placesTotal.str,
            priceTotal: `${group.total.priceTotal.str} $`,
        };
        const totalRow = utils.ws.addRow(Object.values(totalFields));
        styleRowCells(totalRow, {
            alignment: alignmentCenter,
        });

        utils.ws.addRow(['']);
    });
};
