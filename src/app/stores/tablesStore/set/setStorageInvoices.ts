import { checkTable } from '../../../logic/excel/checkTable/checkTable';
import { excludeOfEmptyRows } from '../../../logic/excel/checkTable/excludeOfEmptyRows';
import { InvoiceKTIRowT } from '../../../types/typesTables';
import tablesStore from '../tablesStore';
import { selectSp } from '../../spsStore/select';

export const setStorageInvoices = (table: any[][]) => {
    if (!table) return;
    table.shift();
    const excluded = excludeOfEmptyRows(table);

    const transformedTable = excluded.reduce<InvoiceKTIRowT[]>((totalObj, row, index) => {
        const [
            blNo,
            agreementNo,
            seller,
            vessel,
            product,
            dateStorageStart,
            dateStorageEnd,
            placesTotal,
            days,
            invoiceNo,
            dateInvoice,
            price,
            priceTotal,
            operation,
            operationResult,
            dateAccountSent,
        ] = row;

        try {
            const rowObj: InvoiceKTIRowT = {
                type: 'storageInvoices',
                blNo,
                agreementNo,
                invoiceNo,
                seller: selectSp.seller(seller),
                vessel: selectSp.vessel(vessel),
                product: selectSp.product(product),
                dateStorageStart,
                dateStorageEnd,
                dateAccountSent,
                dateInvoice,
                amount: {
                    placesTotal,
                    price,
                    priceTotal,
                },
                days,
                operationResult,
                operation,
                index: index.toString(),
            };

            totalObj.push(rowObj);
            return totalObj;
        } catch (e) {
            return totalObj;
        }
    }, []);

    checkTable(transformedTable, 'storageInvoices');
    tablesStore.setTable.storageInvoices(transformedTable);
};
