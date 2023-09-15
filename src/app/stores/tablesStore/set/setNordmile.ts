import { excludeOfEmptyRows } from '../../../logic/excel/checkTable/excludeOfEmptyRows';
import { NordmileRowT } from '../../../types/typesTables';
import { selectSp } from '../../spsStore/select';
import tablesStore from '../tablesStore';
import { initAmount } from '../utils/initAmount';

export const setNordmile = (table: any[][]) => {
    table.shift();
    const excluded = excludeOfEmptyRows(table);

    const requests = excluded.reduce<NordmileRowT[]>((totalObj, row, index) => {
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

        try {
            const rowObj: NordmileRowT = {
                type: 'nordmile',
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
                index: index.toString(),
            };

            totalObj.push(rowObj);
            return totalObj;
        } catch (e) {
            return totalObj;
        }
    }, []);

    tablesStore.setTable.nordmile(requests);
};
