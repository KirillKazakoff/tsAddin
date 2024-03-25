import { selectSp } from '../../spsStore/select';
import { initAmount } from '../utils/initAmount';
import { setTable } from './setTable';

export const setSamplesInner = (table: any[][]) => {
    const transformed = setTable({
        table,
        type: 'samplesInnerT',
        headers: {
            id: '№ письма',
            reiceNo: 'Номер рейса',
            knsNo: 'Коносамент',
            dateDischarge: 'Дата перегруза',
            vessel: 'Судно',
            transport: 'Транспорт',
            seller: 'Грузоотправитель',
            product: 'Продукция',
            sort: 'Сорт',
            pack: 'Упаковка',
            places: 'Кол-во мест',
            placesTotal: 'Объем, кг',
            operation: 'Вид операции',
        },
        init: (r) => !!r.id,
        row: (r) => ({
            id: `${r.id.toString()}-О`,
            reiceNo: r.reiceNo,
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
    });

    console.log('hely');
    console.log(transformed);

    return transformed;
};

export type InnerSampleRowT = ReturnType<typeof setSamplesInner>[number];
