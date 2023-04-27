import { InitContractPartT } from '../../../../../types/typesExcelUtils';
import { deleteRow } from '../../../../excel/utils/excelUtilsObj/deleteRow';
import { formatCurrencyLong, formatCount } from '../../../../utils/formatCount';

export const initExportContractCost: InitContractPartT = (utils, agreement) => {
    const { ws } = utils;
    const { priceTotal, productsGroupedBy } = agreement;
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
            const colEng = `*  ${vessel.eng.name}\n    ${desc.eng.name}\n    - USD ${price.str} for one kg net weight`;
            const colRu = `*  ${vessel.ru.name}\n    ${desc.ru.name}\n    - ${price.str} долл. за одну тонну (нетто)`;
            total.push([colEng, colRu]);
        });

        return total;
    }, []);
    ws.insertRows(+costArrayCl.row, costRows, 'i');

    const currency = {
        eng: {
            short: `USD ${formatCount(priceTotal, 2, 2)}`,
            full: formatCurrencyLong(priceTotal, 'en'),
        },
        ru: {
            short: `$${formatCount(priceTotal, 2, 2)}`,
            full: formatCurrencyLong(priceTotal, 'ru'),
        },
    };

    utils.setCell({
        cell: 'Цена_всего',
        eng: `2.2 Total amount of this Agreement is \n${currency.eng.short} (${currency.eng.full})`,
        ru: `2.2 Общая сумма настоящего Дополнения составляет \n${currency.ru.short} (${currency.ru.full})`,
    });

    inheritRow.height = prevHeight;
    inheritRow.commit();

    deleteRow(ws, 'Цена_массив');
};
