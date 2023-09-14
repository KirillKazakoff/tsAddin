import { checkTable } from '../../../logic/excel/checkTable/checkTable';
import { excludeOfEmptyRows } from '../../../logic/excel/checkTable/excludeOfEmptyRows';
import { InnerRowT } from '../../../types/typesTables';
import { selectSp } from '../../spsStore/select';
import tablesStore from '../tablesStore';
import { initAmount } from '../utils/initAmount';

export const setInner = (table: any[][]) => {
    table.shift();
    table.pop();
    const excluded = excludeOfEmptyRows(table);

    const transformedTable = excluded.reduce<InnerRowT[]>((totalObj, row, index) => {
        const [
            client,
            seller,
            contractNo,
            contractDate,
            transport,
            vessel,
            product,
            sort,
            pack,
            konosament,
            placesTotal,
            price,
            priceTotal,
            bank,
            deliveryDate,
            paymentDate,
        ] = row;

        try {
            const rowObj: InnerRowT = {
                buyer: selectSp.clientRu(client),
                seller: selectSp.seller(seller),
                contractNo,
                contractDate,
                vessel: selectSp.vessel(vessel),
                product: selectSp.product(product),
                transport: selectSp.transport(transport),
                sort,
                pack,
                konosament,
                amount: {
                    places: initAmount(placesTotal / pack, 0, 0),
                    placesTotal: initAmount(placesTotal, 1, 3),
                    price: initAmount(price, 2, 2),
                    priceTotal: initAmount(priceTotal, 2, 2),
                },
                bankSeller: bank,
                deliveryDate,
                paymentDate,
                index: index.toString(),
            };

            totalObj.push(rowObj);
            return totalObj;
        } catch (e) {
            return totalObj;
        }
    }, []);

    checkTable(transformedTable, 'inner');
    tablesStore.setTable.inner(transformedTable);
};
