import { checkTable } from '../../../logic/excel/checkTable/checkTable';
import { excludeOfEmptyRows } from '../../../logic/excel/checkTable/excludeOfEmptyRows';
import { SalesRowT } from '../../../types/typesTables';
import { selectSp } from '../../spsStore/select';
import tablesStore from '../tablesStore';
import { initAmount } from '../utils/initAmount';

export const setSales = (table: any[][]) => {
    table.shift();
    const excluded = excludeOfEmptyRows(table);

    const transformedTable = excluded.reduce<SalesRowT[]>((totalObj, row, index) => {
        const [
            contractNo,
            contractDate,
            seller,
            buyer,
            blNo,
            transport,
            dateETA,
            port,
            terms,
            vessel,
            product,
            sort,
            places,
            pack,
            placesTotal,
            price,
            priceTotal,
            certificateDate,
        ] = row;

        try {
            const rowObj: SalesRowT = {
                type: 'sales',
                contractNo,
                contractDate,
                seller: selectSp.agent(seller),
                buyer: selectSp.consignee(buyer),
                blNo,
                transport,
                dateETA,
                port,
                terms,
                vessel,
                product: selectSp.productSales(product),
                sort,
                pack,
                amount: {
                    places: initAmount(places, 0, 0),
                    placesTotal: initAmount(placesTotal, 2, 2),
                    price: initAmount(price, 2, 2),
                    priceTotal: initAmount(priceTotal, 2, 2),
                },
                certificateDate,
                index: index.toString(),
            };

            totalObj.push(rowObj);
            return totalObj;
        } catch (e) {
            return totalObj;
        }
    }, []);

    checkTable(transformedTable, 'sales');
    tablesStore.setTable.sales(transformedTable);
};
