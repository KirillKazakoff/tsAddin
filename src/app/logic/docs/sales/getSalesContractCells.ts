import { CellObjT } from '../../../types/typesExcelUtils';
import { getExcelDateStr } from '../../excel/utils/getExcelDate';
import { SalesContractT } from './groupBy/initSalesContract';

export const getSalesContractCells = (contract: SalesContractT) => {
    const r = contract.record;

    // prettier-ignore
    const cells = {
        common: <CellObjT[]>[
            { cell: 'Контракт_номер', value: `(${r.contractNo})` },
            { cell: 'Контракт_дата', value: `This contract is made on ${getExcelDateStr(r.contractDate, 'en')} between:` },
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
        ],
        live: <CellObjT[]>[
            { cell: 'Контракт_предмет', value: `1.1. The Seller agrees to sell and the Buyer agrees to purchase goods produced by ${r.vessel} with following in table assortment: ` },
            { cell: 'Контракт_ЕТА', value: `ETA ${r.port} ${getExcelDateStr(r.dateETA, 'en')}` },
            { cell: 'Контракт_всего_места', value: r.amount.placesTotal.str },
            { cell: 'Контракт_всего_цена', value: r.amount.priceTotal.str },
        ],
        default: <CellObjT[]>[],
    };

    if (contract.isLive) {
        return [...cells.live, ...cells.common];
    }
    return [...cells.common, ...cells.common];
};
