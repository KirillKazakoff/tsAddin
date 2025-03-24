/* eslint-disable no-param-reassign */
import { getExcelDateShort } from '../../logic/excel/utils/getExcelDate';
import buhDTStore from '../../stores/mailStores/buhDTStore';
import tablesStore from '../../stores/tablesStore/tablesStore';
import { groupBhgData } from './groupBhgData';

// Add date declaration
export const createBhgMail = () => {
    const isVTD = buhDTStore.fields.dt === 'ВТД';
    const choosenCompany = buhDTStore.fields.company;

    const data = groupBhgData();
    const transport = tablesStore.matesT[0].transport.ru.name;
    const customsDate = isVTD ? data[0].record.dateVTD : data[0].record.datePVD;

    const mailTo = choosenCompany === 'ТРК' ? 'buh_trk@sea-wolf.ru' : 'buh_msi6@sea-wolf.ru';
    const cc = 'oved@sea-wolf.ru';
    const subject = `Документы по экспортной продукции, отгруженной через ${transport} ${customsDate}`;
    const header = `Вложением направляю документы по экспортной продукции, отгруженной через ${transport}\n\nТаможенное оформление во Владивостоке: ${customsDate}\n\nПеречень документов:\n\n`;

    const body = encodeURIComponent(
        data.reduce<string>((total, group, i) => {
            const { agreement } = group.record;
            if (agreement.seller.code !== choosenCompany) return total;

            const agreementDate = getExcelDateShort(agreement.date, 'ru');
            // prettier-ignore
            const agreementStr = `${i + 1}) Дополнение №${agreement.agreementNo} от ${agreementDate} к контракту ${agreement.type === 'exportT' ? 'купли-продажи' : 'оказания услуг хранения'} №${agreement.contract.contractNo}`;

            const agreementGroup = group.rows.reduce<string>((agTotal, row) => {
                const declarationNo = isVTD ? row.declaration.vtd : row.declaration.pvd;

                agTotal += `\n     -Инвойс №${row.agreement.invoice} от ${agreementDate}`;
                agTotal += `\n     -ДТ ${declarationNo}\n`;
                return agTotal;
            }, '');

            total += `${agreementStr} ${agreementGroup}\n\n`;

            return total;
        }, ''),
    );

    const href = `mailto:${mailTo}?subject=${subject}&body=${`${header} ${body}`}&from=${mailTo}&cc=${cc}`;
    const hrefReplaced = href.replace(/\n/g, '%0A');

    return hrefReplaced;
};
