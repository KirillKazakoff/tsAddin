import { selectSp } from '../../spsStore/select';
import { initAmount } from '../utils/initAmount';
import { setTable } from './setTable';

export const setFescos = (table: any[][]) => {
    return setTable({
        table,
        type: 'fescoContainers',
        headers: {
            buyer: 'Покупатель',
            seller: 'Продавец',
            konosament: 'Коносамент',
            product: 'Продукция',
            sort: 'Сорт',
            transport: 'Транспорт',
            containerNo: '№ Контейнера',
            places: 'Места, шт',
            placesAmount: 'Кол-во, кг',
            etaDate: 'ETA',
        },
        row: (r) => ({
            buyer: selectSp.clientRu(r.buyer),
            seller: selectSp.seller(r.seller),
            id: r.containerNo,
            konosament: r.konosament,
            product: selectSp.product(r.product),
            transport: selectSp.transport(r.transport),
            sort: r.sort,
            amount: {
                places: initAmount(r.places, 0, 0),
                placesTotal: initAmount(r.placesAmount, 2, 3),
            },
            etaDate: r.etaDate,
        }),
    });
};

export type FescoRowT = ReturnType<typeof setFescos>['transformedTable'][number];
