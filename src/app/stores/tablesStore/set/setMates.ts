import { isNumber } from '../../../logic/utils/isNumber';
import { MateRowT } from '../../../types/typesTables';
import letterStore from '../../letterStore/letterStore';
import { selectSp } from '../../spsStore/select';
import { initAmount } from '../utils/initAmount';
import { setTable } from './setTable';

export const setMates = (table: any[][]) => {
    const transformed = setTable<MateRowT>({
        table,
        type: 'mates',
        row: (r) => {
            const [
                reice,
                konosament,
                date,
                vessel,
                transport,
                company,
                product,
                sort,
                pack,
                places,
                placesTotal,
                operation,
            ] = r;

            let parsedReice: string | number = window.parseInt(reice, 10);
            parsedReice = isNumber(parsedReice) ? parsedReice : '';

            return {
                transport,
                vessel: selectSp.vessel(vessel),
                product: selectSp.product(product.toLowerCase()),
                reice: parsedReice,
                konosament,
                date,
                company,
                pack,
                operation,
                sort,
                amount: {
                    places: initAmount(places, 0, 0),
                    placesTotal: initAmount(placesTotal, 0, 2),
                },
            };
        },
    });

    letterStore.setTransport(transformed[0].transport);
};
