import { CellObjT } from '../../../types/typesExcelUtils';
import { CellDeclarationT } from '../../../types/typesUtils';
import { getExcelDateStr } from '../../excel/utils/getExcelDate';
import { SalesGroupT } from './groupBy/groupSalesContract';

export const getSalesContractCells = (contract: SalesGroupT) => {
    const { record: r } = contract;

    // prettier-ignore
    const cells = {
        common: [
            { cell: 'Контракт_номер', value: `(${r.id})` },
            { cell: 'Контракт_дата', value: `This contract is made on ${getExcelDateStr(r.contractDate, 'en')} between:` },
            { cell: 'Контракт_продавец', value: r.seller.name },
            { cell: 'Контракт_продавец_адрес', value: r.seller.address },
            { cell: 'Контракт_покупатель', value: r.buyer.fullName },
            { cell: 'Контракт_покупатель_адрес', value: r.buyer.addres },
            { cell: 'Контракт_адреса_продавец', value: r.seller.name },
            { cell: 'Контракт_адреса_продавец_адрес', value: r.seller.address },
            { cell: 'Контракт_адреса_счет', value: `A/C NO: ${r.seller.acNo}` },
            { cell: 'Контракт_адреса_банк', value: `BENEFICIARY BANK: ${r.seller.beneficiaryBank}` },
            { cell: 'Контракт_адреса_банк_адрес', value: `ADDRESS: ${r.seller.bankAddress}` },
            { cell: 'Контракт_адреса_банк_свифт', value: `SWIFT: ${r.seller.swift}` },
            { cell: 'Контракт_продавец_печать_подвал_1', value: r.seller.name },
            { cell: 'Контракт_покупатель_печать_подвал_1', value: r.buyer.fullName },
            { cell: 'Контракт_продавец_печать_подвал_2', value: r.seller.name },
            { cell: 'Контракт_покупатель_печать_подвал_2', value: r.buyer.fullName },
            { cell: 'Контракт_доставка', value: `Supply of products is carried out on ${r.terms} ${r.port}` },
        ],
        live: [
            { cell: 'Контракт_предмет', value: `1.1. The Seller agrees to sell and the Buyer agrees to purchase goods produced by ${r.vessel} with following in table assortment: ` },
            { cell: 'Контракт_ЕТА', value: `ETA ${r.port} ${getExcelDateStr(r.dateETA, 'en')}` },
            { cell: 'Контракт_всего_места', value: `${contract.total.placesTotal.str} kg` },
            { cell: 'Контракт_всего_цена', value: `${contract.total.priceTotal.str} $` },
        ],
        default: [
            { cell: 'Контракт_всего_цена', value: `Total amount of this Contract is: ${contract.total.priceTotal.str} $` },
        ],
    } satisfies CellDeclarationT<CellObjT>;

    if (r.isLive) {
        return [...cells.live, ...cells.common];
    }
    return [...cells.common, ...cells.default];
};
