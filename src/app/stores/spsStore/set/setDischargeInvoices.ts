import { checkRowProps } from '../../../logic/excel/checkTable/checkRowProps';
import { excludeOfEmptyRows } from '../../../logic/excel/checkTable/excludeOfEmptyRows';
import { DischargeInvoiceRowT } from '../../../types/typesTables';
import tablesStore from '../../tablesStore/tablesStore';
import { initAmount } from '../../tablesStore/utils/initAmount';

export const setDischargeInvoices = (table: any[][]) => {
    if (!table) return;
    table.shift();
    const excluded = excludeOfEmptyRows(table);

    const transformedTable = excluded.reduce<DischargeInvoiceRowT[]>(
        (totalObj, row, index) => {
            const [
                blNo,
                vessel,
                product,
                placesTotal,
                invoiceNo,
                invoiceDate,
                dischargeDate,
                price,
                priceTotal,
            ] = row;

            const rowObj: DischargeInvoiceRowT = {
                blNo,
                vessel,
                product,
                invoiceNo,
                dischargeDate,
                invoiceDate,
                amount: {
                    price: initAmount(+price, 2, 2),
                    placesTotal: initAmount(+placesTotal, 4, 4),
                    priceTotal: initAmount(+priceTotal, 2, 2),
                },
                index: index.toString(),
            };

            checkRowProps(rowObj, 'Discharge');

            totalObj.push(rowObj);
            return totalObj;
        },
        [],
    );

    tablesStore.setTable.dischargeInvoices(transformedTable);
};
