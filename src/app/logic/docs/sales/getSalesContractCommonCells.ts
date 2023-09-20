/* eslint-disable max-len */

import { CellObjT } from '../../../types/typesExcelUtils';
import { getExcelDateStr } from '../../excel/utils/getExcelDate';
import { SalesContractT } from './groupBy/initSalesContract';

export const getSalesContractCommonCells = (contract: SalesContractT) => {
    const { record: r } = contract;
    const cells:CellObjT[] = [
        { cell: 'Контракт_номер', value: `(${r.id})` },
        {
            cell: 'Контракт_дата',
            value: `This contract is made on ${getExcelDateStr(r.contractDate, 'en')} between:`,
        },
        { cell: 'Контракт_продавец', value: r.seller.name },
        { cell: 'Контракт_продавец_адрес', value: r.seller.addres },
        { cell: 'Контракт_покупатель', value: r.buyer.fullName },
        { cell: 'Контракт_покупатель_адрес', value: r.buyer.addres },
        { cell: 'Контракт_адреса_продавец', value: r.seller.name },
        { cell: 'Контракт_адреса_продавец_адрес', value: r.seller.addres },
        { cell: 'Контракт_адреса_счет', value: r.seller.acNo },
        { cell: 'Контракт_адреса_банк', value: r.seller.beneficiaryBank },
        { cell: 'Контракт_адреса_банк_адрес', value: r.seller.bankAdress },
        { cell: 'Контракт_адреса_банк_свифт', value: r.seller.swift },
        { cell: 'Контракт_продавец_печать_подвал', value: r.seller.name },
        { cell: 'Контракт_покупатель_печать_подвал', value: r.buyer.fullName },
    ];

    return cells;
};

// prettier-ignore
// const cells = {
//     header: <CellObjT[]>[
//         { cell: 'Контракт_номер', value: `(${r.contractNo})` },
//         {
//             cell: 'Контракт_дата',
//             value: `This contract is made on ${getExcelDateStr(r.contractDate, 'en')} between:`,
//         },
//         { cell: 'Контракт_продавец', value: r.seller.name },
//         { cell: 'Контракт_продавец_адрес', value: r.seller.addres },
//         { cell: 'Контракт_покупатель', value: r.buyer.fullName },
//         { cell: 'Контракт_покупатель_адрес', value: r.buyer.addres },
//     ],
//     address: <CellObjT[]>[
//         { cell: 'Контракт_адреса_продавец', value: r.seller.name },
//         { cell: 'Контракт_адреса_продавец_адрес', value: r.seller.addres },
//         { cell: 'Контракт_адреса_счет', value: r.seller.acNo },
//         { cell: 'Контракт_адреса_банк', value: r.seller.beneficiaryBank },
//         { cell: 'Контракт_адреса_банк_адрес', value: r.seller.bankAdress },
//         { cell: 'Контракт_адреса_банк_свифт', value: r.seller.swift },
//     ],
//     footer: <CellObjT[]>[
//         { cell: 'Контракт_продавец_печать_подвал', value: r.seller.name },
//         { cell: 'Контракт_покупатель_печать_подвал', value: r.buyer.fullName },
//     ],
// };
