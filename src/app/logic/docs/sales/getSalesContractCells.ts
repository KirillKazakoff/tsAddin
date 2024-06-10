import { CellDeclarationT, CellObjT } from '../../../types/typesExcelUtils';
import { getExcelDateStr } from '../../excel/utils/getExcelDate';
import { SalesGroupT } from './groupSalesContract';

export const getSalesContractCells = (contract: SalesGroupT) => {
    const { record: r } = contract;

    // prettier-ignore
    const cells = {
        common: [
            { name: 'Контракт_номер', value: `(${r.id})` },
            { name: 'Контракт_дата', value: `This contract is made on ${getExcelDateStr(r.contractDate, 'en')} between:` },
            { name: 'Контракт_продавец', value: r.seller.name },
            { name: 'Контракт_продавец_адрес', value: r.seller.address },
            { name: 'Контракт_покупатель', value: r.buyer.fullName },
            { name: 'Контракт_покупатель_адрес', value: r.buyer.addres },
            { name: 'Контракт_адреса_продавец', value: r.seller.name },
            { name: 'Контракт_адреса_продавец_адрес', value: r.seller.address },
            { name: 'Контракт_адреса_счет', value: `A/C NO: ${r.seller.acNo}` },
            { name: 'Контракт_адреса_банк', value: `BENEFICIARY BANK: ${r.seller.beneficiaryBank}` },
            { name: 'Контракт_адреса_банк_адрес', value: `ADDRESS: ${r.seller.bankAddress}` },
            { name: 'Контракт_адреса_банк_свифт', value: `SWIFT: ${r.seller.swift}` },
            { name: 'Контракт_продавец_печать_подвал_1', value: r.seller.name },
            { name: 'Контракт_покупатель_печать_подвал_1', value: r.buyer.fullName },
            { name: 'Контракт_продавец_печать_подвал_2', value: r.seller.name },
            { name: 'Контракт_покупатель_печать_подвал_2', value: r.buyer.fullName },
            { name: 'Контракт_доставка', value: `Supply of products is carried out on ${r.terms} ${r.port}` },
        ],
        live: [
            { name: 'Контракт_предмет', value: `1.1. The Seller agrees to sell and the Buyer agrees to purchase goods produced by ${r.vessel} with following in table assortment: ` },
            { name: 'Контракт_ЕТА', value: `ETA ${r.port} ${getExcelDateStr(r.dateETA, 'en')}` },
            { name: 'Контракт_всего_места', value: `${contract.total.placesTotal.str} kg` },
            { name: 'Контракт_всего_цена', value: `${contract.total.priceTotal.str} $` },
        ],
        default: [
            { name: 'Контракт_всего_цена', value: `Total amount of this Contract is: ${contract.total.priceTotal.str} $` },
        ],
    } satisfies CellDeclarationT<CellObjT>;

    if (r.isLive) {
        return [...cells.live, ...cells.common];
    }
    return [...cells.common, ...cells.default];
};
