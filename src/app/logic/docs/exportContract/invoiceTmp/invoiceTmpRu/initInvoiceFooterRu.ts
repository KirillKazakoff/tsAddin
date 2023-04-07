import exportContractStore from '../../../../../stores/docsStores/exportContractStore';
import { InitInvoicePartT } from '../../../../../types/typesExcelUtils';

export const initInvoiceFooterRu: InitInvoicePartT = ({ setCell }, invoice) => {
    const { vessel, seller, bankSeller } = invoice.agreement.record;
    const { places, priceTotal, placesTotal } = invoice.amount;

    setCell({
        cell: 'Инвойс_судно_п',
        value: vessel.name,
    });
    setCell({
        cell: 'Инвойс_подвал_места_п',
        value: `${places.str} PCS /`,
    });
    setCell({
        cell: 'Инвойс_подвал_всего_п',
        value: `${placesTotal.str} tn`,
    });
    setCell({
        cell: 'Инвойс_подвал_сумма_п',
        value: `${priceTotal.str} USD`,
    });
    setCell({
        cell: 'Инвойс_банк_получателя_п',
        value: `Beneficiary Bank: ${bankSeller.nameEng}`,
    });
    setCell({
        cell: 'Инвойс_банк_получателя_адрес_п',
        value: bankSeller.adress,
    });
    setCell({
        cell: 'Инвойс_банк_получателя_свифт_п',
        value: `SWIFT: ${bankSeller.swift}`,
    });
    setCell({
        cell: 'Инвойс_получатель_в_пользу_п',
        value: `в пользу ${seller.name}`,
    });
    setCell({
        cell: 'Инвойс_получатель_счет_п',
        value: `A/C: ${bankSeller.accountNo}`,
    });
    setCell({
        cell: 'Инвойс_подписант_п',
        value: `Подписано ${exportContractStore.podpisant.name}`,
    });
};
