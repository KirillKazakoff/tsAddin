/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */

export const innerDictionary = {
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
};

// prettier-ignore
type RecordInputT = Record<string, string>;
type RecordMiddleT<T extends RecordInputT> = Record<keyof T, (string | number)[]>;
type RecordOutputT<T extends RecordInputT> = Record<keyof T, number>;

export const headerRecognition = <T extends RecordInputT>(
    rowSettings: T,
    headers: string[],
): RecordOutputT<T> => {
    const arrayed = Object.keys(rowSettings).reduce<RecordMiddleT<T>>((total, key) => {
        const header = rowSettings[key];
        total[key as keyof T] = [header, 0];
        return total;
    }, {} as RecordMiddleT<T>);

    Object.values(arrayed).forEach((tuple) => {
        tuple[1] = headers.findIndex((title) => title === tuple[0]);
    });

    Object.keys(arrayed).forEach((key) => {
        arrayed[key as keyof T] = arrayed[key][1] as any;
    });

    return arrayed as any;
};
