/* eslint-disable no-param-reassign */
import { selectSp } from '../../spsStore/select';
import tablesStore from '../tablesStore';
import { initAmount } from '../utils/initAmount';
import { setTable } from './setTable';

export const setInnerStorage = (table: any[][]) => {
    const transformed = setTable({
        table,
        type: 'innerStorageT',
        headers: {
            id: 'номер письма',
            knsNo: 'Коносамент',
            dateDischarge: 'Дата перегруза',
            vessel: 'Судно',
            transport: 'Транспорт',
            seller: 'Грузоотправитель',
            product: 'Продукция',
            sort: 'Сорт',
            pack: 'Упаковка',
            places: 'Отгружено мест',
            placesTotal: 'Отгужено Объем',
            operation: 'Грузовые операции',
        },
        init: (r) => !!r.id,
        row: (r) => ({
            id: `${r.id.toString()}-О`,
            reiceNo: '',
            knsNo: r.knsNo,
            dateDischarge: r.dateDischarge,
            vessel: selectSp.vessel(r.vessel),
            transport: selectSp.transport(r.transport),
            seller: selectSp.seller(r.seller),
            product: selectSp.product(r.product),
            sort: r.sort,
            pack: r.pack,
            amount: {
                places: initAmount(r.places, 0, 0),
                placesTotal: initAmount(r.placesTotal, 0, 2),
            },
        }),
        afterStoresInit: (r) => {
            r.reiceNo = tablesStore.matesT.find((mR) => mR.konosament === r.knsNo).reice;
        },
    });

    console.log(transformed.transformedTable);
    return transformed;
};

export type InnerStorageRowT = ReturnType<
    typeof setInnerStorage
>['transformedTable'][number];
