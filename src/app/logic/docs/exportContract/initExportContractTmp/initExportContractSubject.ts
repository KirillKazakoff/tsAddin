/* eslint-disable no-param-reassign */
import { InitExportPartT } from '../../../../types/typesUtils';
import { deleteRow } from '../../../excel/utils/deleteRow';
import { formatCount } from '../../../utils/formatCount';

export const initExportContractSubject: InitExportPartT = (getCell, agreement) => {
    const { vesselInfo, products } = agreement;

    const subjectDescCl = getCell('Предмет_описание');
    subjectDescCl.cellEng.value = `1.1. Seller is obliged to deliver the commodity, and   Buyer  is obligated to receive and pay lot of the cargo,  produced by ${vesselInfo.nameEng}`;
    subjectDescCl.cellRus.value = `1.1. Продавец обязуется поставить Покупателю, а Покупатель обязуется принять и оплатить партию продукции, изготовленную на ${vesselInfo.name}`;

    const ws = subjectDescCl.cellEng.worksheet;
    const inheritRow = ws.getRow(+subjectDescCl.cellEng.row);
    inheritRow.height = 25;
    inheritRow.commit();

    const subjectArrayCl = getCell('Предмет_массив');

    const productRows = products.reduce<string[][]>((total, product) => {
        const { fullName, nameEng } = product.product;
        const amount = formatCount(product.amount, 3, 4);

        const colEng = `* ${nameEng} - ${amount} tn (net weight)`;
        const colRu = `* ${fullName} - ${amount} тн (нетто)`;
        total.push([colEng, colRu]);

        return total;
    }, []);
    ws.insertRows(+subjectArrayCl.cellEng.row, productRows, 'i');

    inheritRow.height = 40;
    inheritRow.commit();

    deleteRow(ws, 'Предмет_массив');
};
