import { NewInitExportPart } from '../../../../types/typesUtils';

export const initExportContractAddreses: NewInitExportPart = (
    setCell,
    agreement,
) => {
    const {
        sellerInfo, buyerInfo, bankProdavecInfo, agentInfo,
    } = agreement;

    setCell({
        cell: 'Адреса_продавец',
        eng: sellerInfo.nameEng,
        ru: sellerInfo.fullName,
    });

    setCell({
        cell: 'Адреса_продавец_адрес',
        eng: sellerInfo.addresEng,
        ru: sellerInfo.addres,
    });

    setCell({
        cell: 'Адреса_банк_получателя',
        eng: bankProdavecInfo.nameEng,
        ru: `Банк-получателя: ${bankProdavecInfo.nameEng}`,
    });

    setCell({
        cell: 'Адреса_банк_получателя_адрес',
        eng: bankProdavecInfo.adress,
        ru: bankProdavecInfo.adress,
    });

    setCell({
        cell: 'Адреса_банк_получателя_свифт',
        eng: `SWIFT: ${bankProdavecInfo.swift}`,
        ru: `SWIFT: ${bankProdavecInfo.swift}`,
    });

    setCell({
        cell: 'Адреса_получатель_в_пользу',
        eng: `in forward to ${sellerInfo.nameEng}`,
        ru: `в пользу ${sellerInfo.fullName}`,
    });

    setCell({
        cell: 'Адреса_получатель_счет',
        eng: `Acc: ${bankProdavecInfo.accountNo}`,
        ru: `Счет № ${bankProdavecInfo.accountNo}`,
    });

    setCell({
        cell: 'Адреса_покупатель',
        eng: buyerInfo.fullName,
        ru: buyerInfo.fullName,
    });

    setCell({
        cell: 'Адреса_покупатель_адрес',
        eng: agentInfo.adress,
        ru: agentInfo.adress,
    });

    setCell({
        cell: 'Адреса_покупатель_банк',
        eng: `Bank Name: ${agentInfo.beneficiaryBank}`,
        ru: `Bank Name: ${agentInfo.beneficiaryBank}`,
    });

    setCell({
        cell: 'Адреса_покупатель_банк_ветвь',
        eng: agentInfo.branch,
        ru: agentInfo.branch,
    });

    setCell({
        cell: 'Адреса_покупатель_банк_адрес',
        eng: agentInfo.bankAdress,
        ru: agentInfo.bankAdress,
    });

    setCell({
        cell: 'Адрес_покупатель_банк_свифт',
        eng: `SWIFT: ${agentInfo.swift}`,
        ru: `SWIFT: ${agentInfo.swift}`,
    });

    setCell({
        cell: 'Адреса_покупатель_бенефициар',
        eng: `Beneficiary: ${buyerInfo.fullName}`,
        ru: `Beneficiary: ${buyerInfo.fullName}`,
    });

    setCell({
        cell: 'Адреса_покупатель_счет',
        eng: `A/C: ${agentInfo.acNo}`,
        ru: `A/C: ${agentInfo.acNo}`,
    });
};
