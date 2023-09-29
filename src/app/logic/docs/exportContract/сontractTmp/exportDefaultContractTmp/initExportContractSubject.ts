/* eslint-disable no-param-reassign */
import { InitContractPartT } from '../../../../../types/typesExcelUtils';
import { deleteRow } from '../../../../excel/utils/excelUtilsObj/deleteRow';

export const initExportContractSubject: InitContractPartT = (utils, agreement) => {
    const { ws } = utils;
    const { subject: subjects } = agreement.productsGroupedBy.vessels.all;

    const subjectArrayCl = utils.getCell('Предмет_массив');

    const productRows = subjects.reduce<string[][]>((total, row) => {
        const { record, total: placesTotal } = row;
        const { product: desc, vessel } = record;

        const colEng = `*  ${vessel.eng.name}\n    ${desc.eng.name} - ${placesTotal.str} tn (net weight)`;
        const colRu = `*  ${vessel.ru.name}\n    ${desc.ru.name} - ${placesTotal.str} тн (нетто)`;
        total.push([colEng, colRu]);

        return total;
    }, []);
    ws.insertRows(+subjectArrayCl.cellEng.row, productRows, 'i');

    deleteRow(ws, 'Предмет_массив');
};
