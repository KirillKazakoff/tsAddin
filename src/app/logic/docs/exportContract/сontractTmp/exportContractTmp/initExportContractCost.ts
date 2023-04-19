import { InitContractPartT } from '../../../../../types/typesExcelUtils';
import { deleteRow } from '../../../../excel/utils/excelUtilsObj/deleteRow';
import { formatCurrencyLong, formatCount } from '../../../../utils/formatCount';

export const initExportContractCost: InitContractPartT = (utils, agreement) => {
    const {
        getCell, setCell, ws, getRow,
    } = utils;
    const { priceTotal, productsGroupedBy } = agreement;
    const { cost: costs } = productsGroupedBy.vessels.all;

    const inheritRow = getRow('Цена_описание', 0);
    const prevHeight = inheritRow.height;
    inheritRow.height = 55;
    inheritRow.commit();

    const costArrayCl = getCell('Цена_массив').cellEng;

    const costRows = costs.reduce<string[][]>((total, row) => {
        const { record, prices } = row;
        const { product: desc, vessel } = record;

        prices.forEach((price) => {
            const colEng = `*  ${vessel.eng.name}\n    ${desc.eng.name}\n    - USD ${price.str} for one kg net weight`;
            const colRu = `*  ${vessel.ru.name}\n    ${desc.ru.name}\n    - ${price.str} долл. за одну тонну (нетто)`;
            total.push([colEng, colRu]);
        });

        return total;
    }, []);
    ws.insertRows(+costArrayCl.row, costRows, 'i');

    const shortCurrencyEngStr = `USD ${formatCount(priceTotal, 2, 2)}`;
    const fullCurrencyEngStr = formatCurrencyLong(priceTotal, 'en');
    const shortCurrencyRuStr = `$${formatCount(priceTotal, 2, 2)}`;
    const fullCurrencyRuStr = formatCurrencyLong(priceTotal, 'ru');

    setCell({
        cell: 'Цена_всего',
        eng: `2.2 Total amount of this Agreement is \n${shortCurrencyEngStr} (${fullCurrencyEngStr})`,
        ru: `2.2 Общая сумма настоящего Дополнения составляет \n${shortCurrencyRuStr} (${fullCurrencyRuStr})`,
    });

    inheritRow.height = prevHeight;
    inheritRow.commit();

    deleteRow(ws, 'Цена_массив');
};
