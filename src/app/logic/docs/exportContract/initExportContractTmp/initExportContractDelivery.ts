/* eslint-disable no-param-reassign */
import { InitContractPartT } from '../../../../types/typesExcelUtils';
import { formatCount } from '../../../utils/formatCount';
import { groupByConsignee } from '../groupBy/groupByConsignee';

export const initExportContractDelivery: InitContractPartT = (utils, agreement) => {
    const { getCell, getRow, deleteRow } = utils;
    const { terms, portTo, products } = agreement;
    const grouped = groupByConsignee(products);

    const termsCl = getCell('Доставка_условия');
    termsCl.cellEng.value = `3.1 The commodity should be delivered under terms of ${terms} ${portTo.nameEng}`;
    termsCl.cellRus.value = `3.1 Поставка осуществляется на условиях ${terms} ${portTo.name}`;

    const deliveryPortCl = getCell('Доставка_порт');
    deliveryPortCl.cellEng.value = `3.5 The delivery of goods to Buyer, mentioned in clause 1.1 of this Agreement should be carried in port of destination ${portTo.nameEng}, ${portTo.countryEng}`;
    deliveryPortCl.cellRus.value = `Передача Покупателю Товара, оговоренного в п.1.1. настоящего Дополнения будет производиться в порту назначения ${portTo.name}, ${portTo.country}`;

    const sertificateArrayCl = getCell('Сертификаты_массив').cellEng;
    const sertificateDescCl = getCell('Сертификаты_описание').cellEng;
    const ws = sertificateDescCl.worksheet;

    const consignees = Object.keys(grouped);

    consignees.forEach((key, i) => {
        const { products: productsConsignee, consignee } = grouped[key];
        const { fullName, adress } = consignee;

        const consigneeStr = `${i + 1}) ${fullName}\n${adress}\n`;
        let colEng = consigneeStr;
        let colRu = consigneeStr;

        productsConsignee.forEach((p) => {
            const { product } = p;
            const amountFormated = formatCount(p.record.amountTotal, 3, 4);

            colEng += `- ${product.nameEng} - ${amountFormated} tn (net weight)\n`;
            colRu += `- ${product.fullName} - ${amountFormated} тн (нетто)\n`;
        }, []);

        ws.insertRow(+sertificateArrayCl.row + i, [colEng, colRu], 'i').commit();
    });

    consignees.forEach((key, i) => {
        const { products: productsConsignee } = grouped[key];

        const row = getRow('Сертификаты_описание', i + 1);
        row.height = 35 + productsConsignee.length * 15;
    });

    const inheritRow = getRow(ws, 'Сертификаты_описание', 0);
    inheritRow.font = { size: 10 };
    deleteRow('Сертификаты_массив');
};
