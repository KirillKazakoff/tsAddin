/* eslint-disable no-param-reassign */
import exportContractStore from '../../../../../stores/docsStores/exportContractStore';
import { InitContractPartT } from '../../../../../types/typesExcelUtils';
import { styleRowCells } from '../../../styleRowCells';

export const initExportContractDelivery: InitContractPartT = (utils, agreement) => {
    const { getCell, ws } = utils;
    const { consignees: consigneeGroup } = agreement.productsGroupedBy;
    const cellName = 'Сертификаты_массив';
    const arrayCl = getCell(cellName).cellEng;

    if (exportContractStore.currentTerms !== 'CFR') {
        utils.deleteRow(cellName);
        utils.deleteRow('Сертификаты_описание');
        return;
    }

    const groups = Object.values(consigneeGroup);
    groups.forEach((group, i) => {
        const { fullName, addres: adress } = group.consignee;

        const consigneeStr = `${i + 1}) ${fullName}\n${adress}\n`;
        let colEng = consigneeStr;
        let colRu = consigneeStr;

        const productGroups = Object.values(group.productGroups);
        productGroups.forEach((productGroup) => {
            const { record, total } = productGroup;
            const { placesTotal } = total;
            const { product, vessel } = record;

            colEng += `\n*  ${vessel.eng.name}\n    ${product.eng.name} - ${placesTotal.str} tn (net weight)`;
            colRu += `\n*  ${vessel.ru.name}\n    ${product.ru.name} - ${placesTotal.str} тн (нетто)`;
        }, []);

        const rowIndex = +arrayCl.row + i;
        ws.insertRow(rowIndex, [colEng, colRu]).commit();

        // styleRow
        const row = ws.getRow(rowIndex);
        const height = 70 + productGroups.length * 35;

        styleRowCells(row, {
            height,
            alignment: { wrapText: true, vertical: 'top' },
            border: { left: { style: 'thin' }, right: { style: 'thin' } },
            font: { size: 10 },
        });
    });

    utils.deleteRow(cellName);
};
