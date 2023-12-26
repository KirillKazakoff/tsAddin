import { setSp } from './setSp';

export const setContracts = (spRange: any[][]) => {
    setSp({
        table: spRange,
        type: 'contracts',
        headers: {
            contractNo: 'Номер',
            date: 'Дата',
            code: 'Код',
            seller: 'Продавец',
            buyerFull: 'Покупатель',
            buyer: 'Краткое Наименование',
            bankSeller: 'Банк Продавца',
            timeEnd: 'Срок окончания контракта',
            status: 'Статус',
        },
        row: (r) => ({
            contractNo: r.contractNo,
            date: r.date,
            buyer: r.buyer,
            buyerFull: r.buyerFull,
            code: r.code,
            seller: r.seller,
            bankSeller: r.bankSeller,
            status: r.status,
            timeEnd: r.timeEnd,
        }),
    });
};
