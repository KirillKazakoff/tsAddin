import { selectSp } from '../../spsStore/select';
import { initAmount } from '../utils/initAmount';
import { setTable } from './setTable';

export const setInner = (table: any[][]) => {
    table.pop();

    setTable({
        table,
        type: 'inner',
        headers: {
            buyer: 'Покупатель',
            seller: 'Продавец',
            id: 'Договор поставки',
            contractDate: 'Дата Договора',
            transport: 'Транспорт',
            vessel: 'Изготовитель',
            product: 'Продукция',
            sort: 'Сорт',
            pack: 'Упаковка',
            konosament: 'Коносамент',
            placesTotal: 'Объем, кг',
            price: 'Цена',
            priceTotal: 'Сумма',
            bank: 'Банк',
            deliveryDate: 'Дата поставки',
            paymentDate: 'Дата оплаты',
            terms: 'Условия',
            port: 'Порт поставки',
        },
        row: (r) => {
            const packSp = selectSp.package(
                `${r.vessel}${r.product}${r.pack.toString().replace('.', ',')}`,
            );

            return {
                buyer: selectSp.clientRu(r.buyer),
                seller: selectSp.seller(r.seller),
                id: r.id,
                contractDate: r.contractDate,
                vessel: selectSp.vessel(r.vessel),
                product: selectSp.product(r.product),
                transport: selectSp.transport(r.transport),
                sort: r.sort,
                pack: r.pack,
                packSp,
                konosament: r.konosament,
                amount: {
                    places: initAmount(r.placesTotal / r.pack, 0, 0),
                    placesTotal: initAmount(r.placesTotal, 1, 3),
                    price: initAmount(r.price, 2, 2),
                    priceTotal: initAmount(r.priceTotal, 2, 2),
                },
                bankSeller: selectSp.bankProdavec(r.bank),
                deliveryDate: r.deliveryDate,
                paymentDate: r.paymentDate,
                port: selectSp.portTamozhnya(r.port),
                terms: r.terms,
            };
        },
    });
};
