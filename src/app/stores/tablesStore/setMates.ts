import { excludeOfEmptyRows } from '../../logic/excel/checkTable/excludeOfEmptyRows';
import { checkRowProps } from '../../logic/excel/checkTable/checkRowProps';
import { MateRowT } from '../../types/typesTables';
import letterStore from '../letterStore/letterStore';
import { selectSp } from '../spsStore/select';
import tablesStore from './tablesStore';
import { initAmount } from './utils/initAmount';

export const setMates = (table: any[][]) => {
    table.shift();
    const excluded = excludeOfEmptyRows(table);

    const mates = excluded.reduce<MateRowT[]>((totalObj, row, index) => {
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

        checkRowProps(rowObj, 'Mates');
        if (operation === 'Образец') return totalObj;

        totalObj.push(rowObj);
        return totalObj;
    }, []);

    tablesStore.setTable.mates(mates);
    letterStore.setTransport(mates[0].transport);
};
