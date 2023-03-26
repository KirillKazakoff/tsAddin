import { InitExportPart } from '../../../../types/typesUtils';
import { formatCurrencyLong, formatCurrency } from '../../../utils/formatCount';

export const initExportContractCost: InitExportPart = (getCell, agreement) => {
    const { products, totalPrice } = agreement;

    const costDescCl = getCell('Цена_описание').cellEng;
    const costArrayCl = getCell('Цена_массив').cellEng;
    const ws = costDescCl.worksheet;

    const costRows = products.reduce<string[][]>((total, product) => {
        const { fullName, nameEng } = product.product;
        const { price } = product;

        const colEng = `* ${nameEng} - USD ${price} for one kg net weight`;
        const colRu = `* ${fullName} - ${price} долл. за одну тонну (нетто)`;
        total.push([colEng, colRu]);

        return total;
    }, []);
    ws.insertRows(+costArrayCl.row, costRows, 'i');

    const totalCostCl = getCell('Цена_всего');

    const shortCurrencyEngStr = formatCurrency(totalPrice, 'eng', 4, 2);
    const fullCurrencyEngStr = formatCurrencyLong(totalPrice, 'en');
    const shortCurrencyRuStr = formatCurrency(totalPrice, 'ru', 4, 2);
    const fullCurrencyRuStr = formatCurrencyLong(totalPrice, 'ru');

    totalCostCl.cellEng.value = `2.2 Total amount of this Agreement is \n${shortCurrencyEngStr} ${fullCurrencyEngStr}`;
    totalCostCl.cellRus.value = `2.2 Общая сумма настоящего Дополнения составляет \n${shortCurrencyRuStr} ${fullCurrencyRuStr}`;
};
