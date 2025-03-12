/* eslint-disable no-param-reassign */
import { getExcelDateShort } from '../../logic/excel/utils/getExcelDate';
import tablesStore from '../../stores/tablesStore/tablesStore';
import { groupBhgData } from './groupBhgData';

// Add date declaration
export const createBhgMail = () => {
    const data = groupBhgData();
    const transport = tablesStore.matesT[0].transport.ru.name;
    const customsDate = getExcelDateShort(tablesStore.customsT[0].date, 'ru');

    const mailTo = 'oved@sea-wolf.ru';
    const subject = `Документы по экспортной продукции, отгруженной через ${transport} ${customsDate}`;
    const header = `Вложением направляю документы по экспортной продукции, отгруженной через ${transport}\n\nТаможенное оформление во Владивостоке: ${customsDate}\n\nПеречень документов:\n\n`;

    const body = encodeURIComponent(
        data.reduce<string>((total, group, i) => {
            const { agreement } = group.record;
            const agreementDate = getExcelDateShort(agreement.date, 'ru');
            // prettier-ignore
            const agreementStr = `${i + 1}) Дополнение №${agreement.agreementNo} от ${agreementDate} к контракту ${agreement.type === 'exportT' ? 'купли-продажи' : 'оказания услуг хранения'} №${agreement.contract.contractNo}`;

            const agreementGroup = group.rows.reduce<string>((agTotal, row) => {
                agTotal += `\n     -Инвойс №${row.agreement.invoice} от ${agreementDate}`;
                agTotal += `\n     -ДТ ${row.declarationNo}\n`;

                return agTotal;
            }, '');

            total += `${agreementStr} ${agreementGroup}\n\n`;

            return total;
        }, ''),
    );

    const href = `mailto:${mailTo}?subject=${subject}&body=${`${header} ${body}`}&from=${mailTo}`;
    const hrefReplaced = href.replace(/\n/g, '%0A');

    return hrefReplaced;
};
