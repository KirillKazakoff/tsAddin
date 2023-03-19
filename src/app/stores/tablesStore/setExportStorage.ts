import { ExportStorageRowT } from '../../types/typesTables';
import tablesStore from './tablesStore';

export const setExportStorage = (table: any[][]) => {
    table.shift();
    const transformedTable = table.reduce<ExportStorageRowT[]>((totalObj, row) => {
        const [
            contract,
            seller,
            buyer,
            vessel,
            transport,
            aggrementNo,
            invoice,
            date,
            blMode,
            blNo,
            msc,
            product,
            sort,
            pack,
            amountPlaces,
            amountTotal,
            price,
            priceTotal,
            portTo,
            id,
            consignee,
            portFrom,
        ] = row;

        const rowObj = {
            contract,
            seller,
            buyer,
            vessel,
            transport,
            aggrementNo,
            invoice,
            date,
            blNo,
            portFrom,
            portTo,
            consignee,
            msc,
            product,
            sort,
            pack,
            amountPlaces,
            amountTotal,
            price,
            priceTotal,
            id,
        };

        totalObj.push(rowObj);
        return totalObj;
    }, []);

    tablesStore.setExportStorage(transformedTable);
};
