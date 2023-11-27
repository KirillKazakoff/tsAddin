import { SalesRowT } from '../../../types/typesTables';
import { selectSp } from '../../spsStore/select';
import { initAmount } from '../utils/initAmount';
import { setTable } from './setTable';

export const setSales = (table: any[][]) => {
    table.shift();

    setTable<SalesRowT>({
        table,
        type: 'sales',
        row: (r) => {
            const [
                id,
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
            ] = r;

            return {
                id,
                contractDate,
                seller: selectSp.agent(seller),
                buyer: selectSp.consignee(buyer),
                blNo: blNo || '-',
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
                isLive: product.toLowerCase().includes('live'),
            };
        },
    });
};
