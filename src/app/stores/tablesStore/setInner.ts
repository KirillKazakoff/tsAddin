import {
    checkEmptyTable,
    checkNotFulfilledRow,
} from '../../logic/excel/utils/checkTable';
import { InnerRowT } from '../../types/typesTables';
import { selectSp } from '../spsStore/select';
import tablesStore from './tablesStore';
import { initAmount } from './utils/initAmount';

export const setInner = (table: any[][]) => {
    table.shift();
    table.pop();
    if (checkEmptyTable(table)) return;

    const transformedTable = table.reduce<InnerRowT[]>((totalObj, row, index) => {
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
        checkNotFulfilledRow(rowObj, 'Inner');
        return totalObj;
    }, []);

    tablesStore.setTable.inner(transformedTable);
};
