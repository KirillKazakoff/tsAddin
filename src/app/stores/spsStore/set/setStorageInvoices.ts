import { checkRowProps } from '../../../logic/excel/checkTable/checkRowProps';
import { excludeOfEmptyRows } from '../../../logic/excel/checkTable/excludeOfEmptyRows';
import { InvoiceKTIRowT } from '../../../types/typesTables';
import tablesStore from '../../tablesStore/tablesStore';
import { selectSp } from '../select';

export const setStorageInvoices = (table: any[][]) => {
    if (!table) return;
    table.shift();
    const excluded = excludeOfEmptyRows(table);

    const transformedTable = excluded.reduce<InvoiceKTIRowT[]>(
        (totalObj, row, index) => {
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

            const rowObj: InvoiceKTIRowT = {
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
                    days,
                    operationResult,
                },
                operation,
                index: index.toString(),
            };

            checkRowProps(rowObj, 'StorageInvoice');

            totalObj.push(rowObj);
            return totalObj;
        },
        [],
    );

    tablesStore.setTable.storageInvoices(transformedTable);
};
