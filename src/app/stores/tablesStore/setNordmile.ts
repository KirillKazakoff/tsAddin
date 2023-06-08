import { checkEmptyTable } from '../../logic/excel/utils/checkTable';
import { NordmileRowT } from '../../types/typesTables';
import { selectSp } from '../spsStore/select';
import tablesStore from './tablesStore';
import { initAmount } from './utils/initAmount';

export const setNordmile = (table: any[][]) => {
    table.shift();
    if (checkEmptyTable(table)) return;

    const requests = table.reduce<NordmileRowT[]>((totalObj, row) => {
        const [
            contractNo,
            contractDate,
            seller,
            buyer,
            producer,
            product,
            pack,
            placesTotal,
            price,
            priceTotal,
            bankSeller,
            paymentDate,
        ] = row;

        const rowObj: NordmileRowT = {
            contractNo,
            contractDate,
            seller: selectSp.seller(seller),
            buyer,
            producer,
            product,
            pack,
            amount: {
                placesTotal: initAmount(placesTotal, 2, 2),
                price: initAmount(price, 2, 2),
                priceTotal: initAmount(priceTotal, 2, 2),
            },
            bankSeller,
            paymentDate,
        };

        totalObj.push(rowObj);
        return totalObj;
    }, []);

    tablesStore.setTable.nordmile(requests);
};
