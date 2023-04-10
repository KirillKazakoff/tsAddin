/* eslint-disable no-param-reassign */
import { InitContractPartT } from '../../../../types/typesExcelUtils';
import { groupByConsignee } from '../groupBy/groupByConsignee';

export const initExportContractDelivery: InitContractPartT = (utils, agreement) => {
    const { getCell, setCell, ws } = utils;
    const { products } = agreement;
    const { terms, portTo } = agreement.record;
    const grouped = groupByConsignee(products);

    setCell({
        cell: 'Доставка_условия',
        eng: `3.1 The commodity should be delivered under terms of ${terms} ${portTo.eng.name}`,
        ru: `3.1 Поставка осуществляется на условиях ${terms} ${portTo.ru.name}`,
    });
    setCell({
        cell: 'Доставка_порт',
        eng: `3.5 The delivery of goods to Buyer, mentioned in clause 1.1 of this Agreement should be carried in port of destination ${portTo.eng.name}, ${portTo.eng.country}`,
        ru: `Передача Покупателю Товара, оговоренного в п.1.1. настоящего Дополнения будет производиться в порту назначения ${portTo.ru.name}, ${portTo.ru.country}`,
    });

    const sertificateArrayCl = getCell('Сертификаты_массив').cellEng;

    const consignees = Object.keys(grouped);
    consignees.forEach((key, i) => {
        const { products: productsConsignee, consignee } = grouped[key];
        const { fullName, adress } = consignee;

        const consigneeStr = `${i + 1}) ${fullName}\n${adress}\n`;
        let colEng = consigneeStr;
        let colRu = consigneeStr;

        productsConsignee.forEach((p) => {
            const { product } = p;
            const { placesTotal } = p.record.amount;

            colEng += `- ${product.eng.name} - ${placesTotal.str} tn (net weight)\n`;
            colRu += `- ${product.ru.name} - ${placesTotal.str} тн (нетто)\n`;
        }, []);

        ws.insertRow(+sertificateArrayCl.row + i, [colEng, colRu], 'i').commit();
    });

    consignees.forEach((key, i) => {
        const { products: productsConsignee } = grouped[key];

        const row = utils.getRow('Сертификаты_описание', i + 1);
        row.height = 35 + productsConsignee.length * 15;
    });

    const inheritRow = utils.getRow('Сертификаты_описание', 0);
    inheritRow.font = { size: 10 };

    utils.deleteRow('Сертификаты_массив');
};
