/* eslint-disable no-param-reassign */
import { InitContractPartT } from '../../../../types/typesExcelUtils';
import { deleteRow } from '../../../excel/utils/excelUtilsObj/deleteRow';

export const initExportContractSubject: InitContractPartT = (utils, agreement) => {
    const { getCell, setCell, ws } = utils;
    const { products } = agreement;
    const { vessel } = agreement.record;

    const subjectDescCl = setCell({
        cell: 'Предмет_описание',
        eng: `1.1. Seller is obliged to deliver the commodity, and   Buyer  is obligated to receive and pay lot of the cargo,  produced by ${vessel.eng.name}`,
        ru: `1.1. Продавец обязуется поставить Покупателю, а Покупатель обязуется принять и оплатить партию продукции, изготовленную на ${vessel.ru.name}`,
    });

    const inheritRow = ws.getRow(+subjectDescCl.cellEng.row);
    inheritRow.height = 25;
    inheritRow.commit();

    const subjectArrayCl = getCell('Предмет_массив');

    const productRows = products.reduce<string[][]>((total, productInfo) => {
        const { product: desc } = productInfo;
        const { placesTotal } = productInfo.record.amount;

        const colEng = `* ${desc.eng.name} - ${placesTotal.str} tn (net weight)`;
        const colRu = `* ${desc.ru.name} - ${placesTotal.str} тн (нетто)`;
        total.push([colEng, colRu]);

        return total;
    }, []);
    ws.insertRows(+subjectArrayCl.cellEng.row, productRows, 'i');

    inheritRow.height = 40;
    inheritRow.commit();

    deleteRow(ws, 'Предмет_массив');
};
