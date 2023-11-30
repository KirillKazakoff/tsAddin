import { isNumber } from '../../../logic/utils/isNumber';
import { MateRowT } from '../../../types/typesTables';
import letterStore from '../../letterStore/letterStore';
import { selectSp } from '../../spsStore/select';
import { initAmount } from '../utils/initAmount';
import { setTable } from './setTable';

export const setMates = (table: any[][]) => {
    const transformed = setTable({
        table,
        type: 'mates',
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
            transport: r.transport,
            vessel: selectSp.vessel(r.vessel),
            product: selectSp.product(r.product.toLowerCase()),
            reice: isNumber(r.reice) ? r.reice : '',
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
    }) as MateRowT[];

    letterStore.setTransport(transformed[0].transport);
};
