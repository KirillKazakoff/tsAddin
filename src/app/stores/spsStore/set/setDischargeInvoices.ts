import { checkTable } from '../../../logic/excel/checkTable/checkTable';
import { excludeOfEmptyRows } from '../../../logic/excel/checkTable/excludeOfEmptyRows';
import { InvoiceKTIRowT } from '../../../types/typesTables';
import tablesStore from '../../tablesStore/tablesStore';
import { selectSp } from '../select';

export const setDischargeInvoices = (table: any[][]) => {
    if (!table) return;
    table.shift();
    const excluded = excludeOfEmptyRows(table);

    const transformedTable = excluded.reduce<InvoiceKTIRowT[]>(
        (totalObj, row, index) => {
            const [
                blNo,
                seller,
                agreementNo,
                vessel,
                product,
                placesTotal,
                invoiceNo,
                dateInvoice,
                dateDischarge,
                price,
                priceTotal,
            ] = row;

            const rowObj: InvoiceKTIRowT = {
                agreementNo,
                invoiceNo,
                blNo,
                seller: selectSp.seller(seller),
                vessel: selectSp.vessel(vessel),
                product: selectSp.product(product),
                dateDischarge,
                dateInvoice,
                amount: {
                    price,
                    placesTotal,
                    priceTotal,
                },
                index: index.toString(),
            };

            totalObj.push(rowObj);
            return totalObj;
        },
        [],
    );

    checkTable(transformedTable, 'dischargeInvoices');
    tablesStore.setTable.dischargeInvoices(transformedTable);
};
