import { InitContractPartT } from '../../../../../types/typesExcelUtils';
import { deleteRow } from '../../../../excel/utils/excelUtilsObj/deleteRow';

export const initExportContractCost: InitContractPartT = (utils, agreement) => {
    const { ws } = utils;
    const { productsGroupedBy } = agreement;
    const { cost: costs } = productsGroupedBy.vessels.all;

    // style rows from inherit row
    const inheritRow = utils.getRow('Цена_описание', 0);
    const prevHeight = inheritRow.height;
    inheritRow.height = 50;
    inheritRow.commit();

    const costArrayCl = utils.getCell('Цена_массив').cellEng;

    const costRows = costs.reduce<string[][]>((total, row) => {
        const { record, prices } = row;
        const { product: desc, vessel } = record;

        prices.forEach((price) => {
            const colEng = `*  ${vessel.eng.name}\n    ${desc.eng.name}\n    - USD ${price.str} for one tn net weight`;
            const colRu = `*  ${vessel.ru.name}\n    ${desc.ru.name}\n    - ${price.str} долл. за одну тонну (нетто)`;
            total.push([colEng, colRu]);
        });

        return total;
    }, []);
    ws.insertRows(+costArrayCl.row, costRows, 'i');

    inheritRow.height = prevHeight;
    inheritRow.commit();

    deleteRow(ws, 'Цена_массив');
};
