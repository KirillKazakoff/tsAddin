/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */

export const headerRecognition = (headers: string[]) => {
    const dictionary = {
        buyer: ['Покупатель', 0],
        seller: ['Продавец', 0],
        id: ['Договор поставки', 0],
        contractDate: ['Дата Договора', 0],
        transport: ['Транспорт', 0],
        vessel: ['Изготовитель', 0],
        product: ['Продукция', 0],
        sort: ['Сорт', 0],
        pack: ['Упаковка', 0],
        konosament: ['Коносамент', 0],
        placesTotal: ['Объем, кг', 0],
        price: ['Цена', 0],
        priceTotal: ['Сумма', 0],
        bank: ['Банк', 0],
        deliveryDate: ['Дата поставки', 0],
        paymentDate: ['Дата оплаты', 0],
    };

    Object.values(dictionary).forEach((tuple) => {
        tuple[1] = headers.findIndex((title) => title === tuple[0]);
    });

    Object.keys(dictionary).forEach((key) => {
        dictionary[key] = dictionary[key][1];
    });

    return dictionary;
};
