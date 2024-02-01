import { formatCount, formatCurrencyLong } from '../../../utils/formatCount';
import type { ExportGroupT } from '../groupAgByNo';

export const getCostGoodsStr = ({ record, total }: ExportGroupT) => {
    const { currency } = record;
    const priceTotal = total.priceTotal.count;

    const shortFormat = `${currency.key} ${formatCount(priceTotal, 2, 2)}`;

    const longFormatEng = formatCurrencyLong(priceTotal, 'en')
        .replace('USD', currency.key)
        .replace('US dollars', `${currency.eng.name}s`)
        .replace('US dollar', `${currency.eng.name}s`)
        .replace('cents', `${currency.eng.decimals}`);
    const eng = `2.2. Total amount of this Agreement is specified in ${currency.key} (${currency.eng.country} ${currency.eng.name}s)\nand is the following: ${shortFormat} (${longFormatEng})`;

    const longFormatRu = formatCurrencyLong(priceTotal, 'ru')
        .replace('$', currency.key)
        .replace('доллар США', currency.ru.padezh.seeWhat[0])
        .replace('доллара США', currency.ru.padezh.seeWhat[1])
        .replace('долларов США', currency.ru.padezh.seeWhat[2])
        .replace('центов', currency.ru.decimals);
    const ru = `2.2. Общая сумма настоящего Дополнения указана в ${currency.key} (${currency.ru.padezh.thinkAbout} ${currency.ru.country})\nи составляет: ${shortFormat} (${longFormatRu})`;

    return { eng, ru };
};
