import exportContractStore from '../../../../stores/docsStores/exportContractStore';
import {
    CellObjDoubleT,
    InitContractPartT,
} from '../../../../types/typesExcelUtils';

export const initExportContractAddreses: InitContractPartT = (utils, agreement) => {
    const { seller, bankSeller, agent } = agreement.record;
    const { podpisant } = exportContractStore;
    const { setCell } = utils;

    const cells: CellObjDoubleT[] = [
        {
            cell: 'Адреса_продавец',
            eng: seller.eng.name,
            ru: seller.ru.name,
        },
        {
            cell: 'Адреса_продавец_адрес',
            eng: seller.eng.addres,
            ru: seller.ru.addres,
        },
        {
            cell: 'Адреса_банк_получателя',
            eng: bankSeller.eng.name,
            ru: `Банк-получателя: ${bankSeller.eng.name}`,
        },
        {
            cell: 'Адреса_банк_получателя_адрес',
            eng: bankSeller.adress,
            ru: bankSeller.adress,
        },
        {
            cell: 'Адреса_банк_получателя_свифт',
            eng: `SWIFT: ${bankSeller.swift}`,
            ru: `SWIFT: ${bankSeller.swift}`,
        },
        {
            cell: 'Адреса_получатель_в_пользу',
            eng: `in forward to ${bankSeller.eng.name}`,
            ru: `в пользу ${bankSeller.ru.name}`,
        },
        {
            cell: 'Адреса_получатель_счет',
            eng: `Acc: ${bankSeller.accountNo}`,
            ru: `Счет № ${bankSeller.accountNo}`,
        },
        {
            cell: 'Адреса_покупатель',
            eng: agent.name,
            ru: agent.name,
        },
        {
            cell: 'Адреса_покупатель_адрес',
            eng: agent.addres,
            ru: agent.addres,
        },
        {
            cell: 'Адреса_покупатель_банк',
            eng: `Bank Name: ${agent.beneficiaryBank}`,
            ru: `Bank Name: ${agent.beneficiaryBank}`,
        },
        {
            cell: 'Адреса_покупатель_банк_ветвь',
            eng: agent.branch,
            ru: agent.branch,
        },
        {
            cell: 'Адреса_покупатель_банк_адрес',
            eng: agent.bankAdress,
            ru: agent.bankAdress,
        },
        {
            cell: 'Адреса_покупатель_банк_свифт',
            eng: `SWIFT: ${agent.swift}`,
            ru: `SWIFT: ${agent.swift}`,
        },
        {
            cell: 'Адреса_покупатель_бенефициар',
            eng: `Beneficiary: ${agent.name}`,
            ru: `Beneficiary: ${agent.name}`,
        },
        {
            cell: 'Адреса_покупатель_счет',
            eng: `A/C: ${agent.acNo}`,
            ru: `A/C: ${agent.acNo}`,
        },
        {
            cell: 'Адреса_подпись',
            eng: `Продавец/Seller  _______________________${podpisant.eng.name}`,
            ru: `Покупатель/Buyer ________________________${agent.eng.signatory}`,
        },
    ];

    cells.forEach((cell) => setCell(cell));
};
