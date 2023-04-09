import { InitContractPartT } from '../../../../types/typesExcelUtils';
import { deleteRow } from '../../../excel/utils/excelUtilsObj/deleteRow';
import { formatCurrencyLong, formatCount } from '../../../utils/formatCount';

export const initExportContractCost: InitContractPartT = (utils, agreement) => {
    const { getCell } = utils;
    const { products, priceTotal } = agreement;

    const costDescCl = getCell('Цена_описание').cellEng;
    const costArrayCl = getCell('Цена_массив').cellEng;
    const ws = costDescCl.worksheet;

    const costRows = products.reduce<string[][]>((total, productInfo) => {
        const { product: desc } = productInfo;
        const { price } = productInfo.record.amount;

        const colEng = `* ${desc.eng.name} - USD ${price.str} for one kg net weight`;
        const colRu = `* ${desc.ru.name} - ${price.str} долл. за одну тонну (нетто)`;

        if (productInfo.isPriceUnique) {
            total.push([colEng, colRu]);
        }

        return total;
    }, []);
    ws.insertRows(+costArrayCl.row, costRows, 'i');

    const totalCostCl = getCell('Цена_всего');

    const shortCurrencyEngStr = `USD ${formatCount(priceTotal, 2, 2)}`;
    const fullCurrencyEngStr = formatCurrencyLong(priceTotal, 'en');
    const shortCurrencyRuStr = `$${formatCount(priceTotal, 2, 2)}`;
    const fullCurrencyRuStr = formatCurrencyLong(priceTotal, 'ru');

    totalCostCl.cellEng.value = `2.2 Total amount of this Agreement is \n${shortCurrencyEngStr} (${fullCurrencyEngStr})`;
    totalCostCl.cellRus.value = `2.2 Общая сумма настоящего Дополнения составляет \n${shortCurrencyRuStr} (${fullCurrencyRuStr})`;

    deleteRow(ws, 'Цена_массив');
};
