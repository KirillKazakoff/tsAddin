import { checkTable } from '../../../logic/excel/checkTable/checkTable';
import { excludeOfEmptyRows } from '../../../logic/excel/checkTable/excludeOfEmptyRows';
import { MateRowT } from '../../../types/typesTables';
import letterStore from '../../letterStore/letterStore';
import { selectSp } from '../../spsStore/select';
import tablesStore from '../tablesStore';
import { initAmount } from '../utils/initAmount';

export const setMates = (table: any[][]) => {
    table.shift();
    const excluded = excludeOfEmptyRows(table);

    const transformedTable = excluded.reduce<MateRowT[]>((totalObj, row, index) => {
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

        try {
            const rowObj: MateRowT = {
                type: 'mates',
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

            if (operation === 'Образец') return totalObj;

            totalObj.push(rowObj);
            return totalObj;
        } catch (e) {
            return totalObj;
        }
    }, []);

    checkTable(transformedTable, 'mates');
    tablesStore.setTable.mates(transformedTable);

    letterStore.setTransport(transformedTable[0].transport);
};
