/* eslint-disable no-param-reassign */
import { InitContractPartT } from '../../../../../types/typesExcelUtils';
import { styleRowCells } from '../../../styleRowCells';

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

    const cellName = 'Сертификаты_массив';
    const arrayCl = getCell(cellName).cellEng;

    const groups = Object.values(consigneeGroup);
    groups.forEach((group, i) => {
        const { fullName, addres: adress } = group.consignee;

        const consigneeStr = `${i + 1}) ${fullName}\n${adress}\n`;
        let colEng = consigneeStr;
        let colRu = consigneeStr;

        group.rows.forEach((row) => {
            const { product, amount, vessel } = row;
            const { placesTotal } = amount;

            colEng += `\n*  ${vessel.eng.name}\n    ${product.eng.name} - ${placesTotal.str} tn (net weight)`;
            colRu += `\n*  ${vessel.ru.name}\n    ${product.ru.name} - ${placesTotal.str} тн (нетто)`;
        }, []);

        const rowIndex = +arrayCl.row + i;
        ws.insertRow(rowIndex, [colEng, colRu]).commit();

        // styleRow
        const row = ws.getRow(rowIndex);
        const height = 60 + group.rows.length * 35;

        styleRowCells(row, {
            height,
            alignment: { wrapText: true, vertical: 'top' },
            border: { left: { style: 'thin' }, right: { style: 'thin' } },
            font: { size: 10 },
        });
    });

    utils.deleteRow(cellName);
};
