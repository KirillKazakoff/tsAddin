import exportContractStore from '../../../../stores/docsStores/exportContractStore';
import { InitContractPartT } from '../../../../types/typesExcelUtils';

export const initExportContractAddreses: InitContractPartT = (utils, agreement) => {
    const { seller, bankSeller, agent } = agreement.record;
    const { podpisant } = exportContractStore;
    const { setCell } = utils;

    setCell({
        cell: 'Адреса_продавец',
        eng: seller.nameEng,
        ru: seller.fullName,
    });

    setCell({
        cell: 'Адреса_продавец_адрес',
        eng: seller.addresEng,
        ru: seller.addres,
    });

    setCell({
        cell: 'Адреса_банк_получателя',
        eng: bankSeller.adress,
        ru: `Банк-получателя: ${bankSeller.nameEng}`,
    });

    setCell({
        cell: 'Адреса_банк_получателя_адрес',
        eng: bankSeller.adress,
        ru: bankSeller.adress,
    });

    setCell({
        cell: 'Адреса_банк_получателя_свифт',
        eng: `SWIFT: ${bankSeller.swift}`,
        ru: `SWIFT: ${bankSeller.swift}`,
    });

    setCell({
        cell: 'Адреса_получатель_в_пользу',
        eng: `in forward to ${seller.nameEng}`,
        ru: `в пользу ${seller.fullName}`,
    });

    setCell({
        cell: 'Адреса_получатель_счет',
        eng: `Acc: ${bankSeller.accountNo}`,
        ru: `Счет № ${bankSeller.accountNo}`,
    });

    setCell({
        cell: 'Адреса_покупатель',
        eng: agent.name,
        ru: agent.name,
    });

    setCell({
        cell: 'Адреса_покупатель_адрес',
        eng: agent.adress,
        ru: agent.adress,
    });

    setCell({
        cell: 'Адреса_покупатель_банк',
        eng: `Bank Name: ${agent.beneficiaryBank}`,
        ru: `Bank Name: ${agent.beneficiaryBank}`,
    });

    setCell({
        cell: 'Адреса_покупатель_банк_ветвь',
        eng: agent.branch,
        ru: agent.branch,
    });

    setCell({
        cell: 'Адреса_покупатель_банк_адрес',
        eng: agent.bankAdress,
        ru: agent.bankAdress,
    });

    setCell({
        cell: 'Адреса_покупатель_банк_свифт',
        eng: `SWIFT: ${agent.swift}`,
        ru: `SWIFT: ${agent.swift}`,
    });

    setCell({
        cell: 'Адреса_покупатель_бенефициар',
        eng: `Beneficiary: ${agent.name}`,
        ru: `Beneficiary: ${agent.name}`,
    });

    setCell({
        cell: 'Адреса_покупатель_счет',
        eng: `A/C: ${agent.acNo}`,
        ru: `A/C: ${agent.acNo}`,
    });

    setCell({
        cell: 'Адреса_подпись',
        eng: `Продавец/Seller  _______________________${podpisant.nameEng}`,
        ru: `Покупатель/Buyer ________________________${agent.signatoryEng}`,
    });
};
