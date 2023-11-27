import { NordmileRowT } from '../../../types/typesTables';
import { selectSp } from '../../spsStore/select';
import { initAmount } from '../utils/initAmount';
import { setTable } from './setTable';

export const setNordmile = (table: any[][]) => {
    table.shift();

    setTable<NordmileRowT>({
        table,
        type: 'nordmile',
        row: (r) => {
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
            ] = r;

            return {
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
        },
    });
};
