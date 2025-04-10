import { isNumber } from '../../../logic/utils/isNumber';
import offerStore from '../../mailStores/offerStore';
import { selectSp } from '../../spsStore/select';
import { initAmount } from '../utils/initAmount';
import { setTable } from './setTable';

export const setMates = (table: any[][]) => {
    const transformed = setTable({
        table,
        type: 'matesT',
        headers: {
            reice: 'Номер рейса',
            konosament: 'Коносамент',
            date: 'Дата перегруза',
            vessel: 'Судно',
            transport: 'Транспорт',
            company: 'Грузоотправитель',
            product: 'Продукция',
            sort: 'Сорт',
            pack: 'Упаковка',
            places: 'Кол-во мест',
            placesTotal: 'Объем, кг',
            operation: 'Вид операции',
        },
        row: (r) => ({
            transport: selectSp.transport(r.transport),
            vessel: selectSp.vessel(r.vessel),
            product: selectSp.product(r.product.toLowerCase()),
            reice: isNumber(+r.reice) ? r.reice : '',
            konosament: r.konosament,
            date: r.date,
            company: r.company,
            pack: r.pack,
            operation: r.operation,
            sort: r.sort,
            amount: {
                places: initAmount(r.places, 0, 0),
                placesTotal: initAmount(r.placesTotal, 0, 2),
            },
        }),
    });

    offerStore.setTransport(transformed.transformedTable[0].transport.code);

    return transformed;
};

export type MateRowT = ReturnType<typeof setMates>['transformedTable'][number];
