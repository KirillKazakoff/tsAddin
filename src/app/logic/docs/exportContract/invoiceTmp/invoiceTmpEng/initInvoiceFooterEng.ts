import exportContractStore from '../../../../../stores/docsStores/exportContractStore';
import { InitInvoicePartT } from '../../../../../types/typesExcelUtils';

export const initInvoiceFooterEng: InitInvoicePartT = ({ setCell }, invoice) => {
    const { vesselInfo, bankProdavecInfo, sellerInfo } = invoice.agreement;
    const { places, priceTotal, placesTotal } = invoice.amount;

    setCell({
        cell: 'Инвойс_судно',
        value: vesselInfo.nameEng,
    });
    setCell({
        cell: 'Инвойс_подвал_места',
        value: `${places.str} PCS /`,
    });
    setCell({
        cell: 'Инвойс_подвал_всего',
        value: `${placesTotal.str} tn`,
    });
    setCell({
        cell: 'Инвойс_подвал_сумма',
        value: `${priceTotal.str} USD`,
    });
    setCell({
        cell: 'Инвойс_банк_получателя',
        value: `Beneficiary Bank: ${bankProdavecInfo.nameEng}`,
    });
    setCell({
        cell: 'Инвойс_банк_получателя_адрес',
        value: bankProdavecInfo.adress,
    });
    setCell({
        cell: 'Инвойс_банк_получателя_свифт',
        value: `SWIFT: ${bankProdavecInfo.swift}`,
    });
    setCell({
        cell: 'Инвойс_получатель_в_пользу',
        value: `in forward to ${sellerInfo.nameEng}`,
    });
    setCell({
        cell: 'Инвойс_получатель_счет',
        value: `A/C: ${bankProdavecInfo.accountNo}`,
    });
    setCell({
        cell: 'Инвойс_подписант',
        value: `Signed by ${exportContractStore.podpisant.nameEng}`,
    });
};
