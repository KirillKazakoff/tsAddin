/* eslint-disable no-param-reassign */
import { InitExportPart } from '../../../../types/typesUtils';
import { deleteRow } from '../../../excel/utils/deleteRow';
import { formatCount } from '../../../utils/formatCount';

export const initExportContractSubject: InitExportPart = (getCell, agreement) => {
    const { vesselInfo, products } = agreement;

    const subjectDescCl = getCell('Предмет_описание');
    subjectDescCl.cellEng.value = `1.1. Seller is obliged to deliver the commodity, and   Buyer  is obligated to receive and pay lot of the cargo,  produced by ${vesselInfo.nameEng}`;
    subjectDescCl.cellRus.value = `1.1. Продавец обязуется поставить Покупателю, а Покупатель обязуется принять и оплатить партию продукции, изготовленную на ${vesselInfo.name}`;

    const ws = subjectDescCl.cellEng.worksheet;
    const subjectDescRow = ws.getRow(+subjectDescCl.cellEng.row);
    subjectDescRow.height = 25;
    subjectDescRow.commit();

    const subjectArrayCl = getCell('Предмет_массив');

    const productRows = products.reduce<string[][]>((total, product) => {
        const { fullName, nameEng } = product.product;
        const amount = formatCount(product.amount, 3);

        const colEng = `* ${nameEng} - ${amount} tn (net weight)`;
        const colRu = `* ${fullName} - ${amount} тн (нетто)`;
        total.push([colEng, colRu]);

        return total;
    }, []);
    ws.insertRows(+subjectArrayCl.cellEng.row, productRows, 'i');

    subjectDescRow.height = 40;
    subjectDescRow.commit();

    deleteRow(ws, 'Предмет_массив');
};
