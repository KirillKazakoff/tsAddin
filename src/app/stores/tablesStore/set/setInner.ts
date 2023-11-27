import { InnerRowT } from '../../../types/typesTables';
import { selectSp } from '../../spsStore/select';
import { initAmount } from '../utils/initAmount';
import { setTable } from './setTable';

export const setInner = (table: any[][]) => {
    table.shift();
    table.pop();

    setTable<InnerRowT>({
        table,
        type: 'inner',
        row: (r) => {
            const [
                client,
                seller,
                id,
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
            ] = r;

            return {
                buyer: selectSp.clientRu(client),
                seller: selectSp.seller(seller),
                id,
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
            };
        },
    });
};
