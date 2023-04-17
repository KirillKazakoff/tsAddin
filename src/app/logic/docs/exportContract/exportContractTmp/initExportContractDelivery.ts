/* eslint-disable no-param-reassign */
import { InitContractPartT } from '../../../../types/typesExcelUtils';

export const initExportContractDelivery: InitContractPartT = (utils, agreement) => {
    const { getCell, setCell, ws } = utils;
    const { consignees: consigneeGroup } = agreement.productsGroupedBy;
    const { terms, portTo } = agreement.record;

    setCell({
        cell: 'Доставка_условия',
        eng: `3.1 The commodity should be delivered under terms of ${terms} ${portTo.eng.name}`,
        ru: `3.1 Поставка осуществляется на условиях ${terms} ${portTo.ru.name}`,
    });
    setCell({
        cell: 'Доставка_порт',
        eng: `3.5 The delivery of goods to Buyer, mentioned in clause 1.1 of this Agreement should be carried in port of destination ${portTo.eng.name}, ${portTo.eng.country}`,
        ru: `3.5 Передача Покупателю Товара, оговоренного в п.1.1. настоящего Дополнения будет производиться в порту назначения ${portTo.ru.name}, ${portTo.ru.country}`,
    });

    const sertificateArrayCl = getCell('Сертификаты_массив').cellEng;

    const consignees = Object.values(consigneeGroup);
    consignees.forEach((consignee, i) => {
        const { fullName, adress } = consignee.consignee;

        const consigneeStr = `${i + 1}) ${fullName}\n${adress}\n`;
        let colEng = consigneeStr;
        let colRu = consigneeStr;

        consignee.rows.forEach((row) => {
            const { product, amount, vessel } = row;
            const { placesTotal } = amount;

            colEng += `\n*  ${vessel.eng.name}\n    ${product.eng.name} - ${placesTotal.str} tn (net weight)`;
            colRu += `\n*  ${vessel.ru.name}\n    ${product.ru.name} - ${placesTotal.str} тн (нетто)`;
        }, []);

        ws.insertRow(+sertificateArrayCl.row + i, [colEng, colRu], 'i').commit();
    });

    consignees.forEach((consignee, i) => {
        const row = utils.getRow('Сертификаты_описание', i + 1);
        row.height = 40 + consignee.rows.length * 40;
    });

    // const inheritRow = utils.getRow('Сертификаты_описание', 0);
    // inheritRow.font = { size: 10 };

    utils.deleteRow('Сертификаты_массив');
};
