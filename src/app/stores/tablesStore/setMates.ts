import {
    checkEmptyTable,
    checkNotFulfilledRow,
} from '../../logic/excel/utils/checkTable';
import { MateRowT } from '../../types/typesTables';
import letterStore from '../letterStore/letterStore';
import { selectSp } from '../spsStore/select';
import tablesStore from './tablesStore';
import { initAmount } from './utils/initAmount';

export const setMates = (table: any[][]) => {
    table.shift();
    if (checkEmptyTable(table)) return;

    const mates = table.reduce<MateRowT[]>((totalObj, row, index) => {
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
        ] = row;

        const rowObj: MateRowT = {
            transport,
            vessel: selectSp.vessel(vessel),
            product: selectSp.product(product.toLowerCase()),
            reice,
            konosament,
            date,
            company,
            pack,
            operation,
            sort,
            amount: {
                places: initAmount(places, 0, 0),
                total: initAmount(placesTotal, 0, 2),
            },
            index: index.toString(),
        };

        checkNotFulfilledRow(rowObj, 'Mates');
        if (operation === 'Образец') return totalObj;

        totalObj.push(rowObj);
        return totalObj;
    }, []);

    tablesStore.setTable.mates(mates);
    letterStore.setTransport(mates[0].transport);
};
