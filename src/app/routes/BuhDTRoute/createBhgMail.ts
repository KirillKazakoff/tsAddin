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
    const agreements = data.filter((a) => (isVTD ? a.record.dateVTD : a.record.datePVD));
    let transport = tablesStore.matesT[0].transport.ru.name;

    const isLiveCrab = agreements[0].record.agreement.product.code.includes('живой');

    if (isLiveCrab) {
        transport = agreements[0].record.agreement.vessel.ru.name;
    }

    const customsDate = isVTD
        ? agreements[0].record.dateVTD
        : agreements[0].record.datePVD;

    const mailTo = choosenCompany === 'ТРК' ? 'buh_trk@sea-wolf.ru' : 'buh_msi6@sea-wolf.ru';
    const cc = 'oved@sea-wolf.ru';
    const subject = `Документы по экспортной продукции, отгруженной через ${transport} ${customsDate}`;
    const header = `Вложением направляю документы по экспортной продукции, отгруженной через ${transport}\n\nТаможенное оформление во Владивостоке: ${customsDate}\n\nПеречень документов:\n\n`;

    let i = 0;
    const body = encodeURIComponent(
        data.reduce<string>((total, group) => {
            const agreementRecord = isVTD
                ? group.record.agreement
                : group.record.agreementPVD;

            const isCompany = agreementRecord.seller.code === choosenCompany;
            const isPVD = !isVTD && group.record.datePVD;
            if (!isCompany || (!isPVD && !isVTD)) return total;

            const agreementDate = getExcelDateShort(agreementRecord.date, 'ru');
            // prettier-ignore
            const agreementStr = `${i + 1}) Дополнение №${agreementRecord.agreementNo} от ${agreementDate} к контракту ${agreementRecord.type === 'exportT' || isLiveCrab ? 'купли-продажи' : 'оказания услуг хранения'} №${agreementRecord.contract.contractNo}`;

            const agreementGroup = group.rows.reduce<string>((agTotal, row) => {
                const declarationNo = isVTD ? row.declaration.vtd : row.declaration.pvd;
                const agreementRow = isVTD ? row.agreement : row.agreementPVD;

                agTotal += `\n     -Инвойс №${agreementRow.invoice} от ${agreementDate}`;
                agTotal += `\n     -ДТ ${declarationNo}\n`;
                return agTotal;
            }, '');

            total += `${agreementStr} ${agreementGroup}\n\n`;
            i += 1;

            return total;
        }, ''),
    );

    const href = `mailto:${mailTo}?subject=${subject}&body=${`${header} ${body}`}&from=${mailTo}&cc=${cc}`;
    const hrefReplaced = href.replace(/\n/g, '%0A');

    return hrefReplaced;
};
