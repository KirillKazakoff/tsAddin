/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    checkEmptyTable,
    checkNotFulfilledRow,
} from '../../logic/excel/utils/checkTable';
import { MateRowT } from '../../types/typesTables';
import { selectProductSp, selectVesselSp } from '../spsStore/select';
import tablesStore from './tablesStore';
import { initAmount } from './utils/initAmount';

export const setMates = (table: any[][]) => {
    table.shift();
    if (checkEmptyTable(table)) return;

    const transformedTable = table.reduce((totalObj, row, index) => {
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
            amountPlaces,
            amountTotal,
            operation,
        ] = row;

        const rowObj: MateRowT = {
            transport,
            vessel: selectVesselSp(vessel),
            product: selectProductSp(product.toLowerCase()),
            reice,
            konosament,
            date,
            company,
            pack,
            operation,
            sort,
            amount: {
                places: initAmount(amountPlaces, 0, 0),
                total: initAmount(amountTotal, 0, 2),
            },
            index: index.toString(),
        };

        checkNotFulfilledRow(rowObj, 'Mates');
        if (operation === 'Образец') return totalObj;

        totalObj.push(rowObj);
        return totalObj;
    }, []);

    tablesStore.setTable.mates(transformedTable);
};
