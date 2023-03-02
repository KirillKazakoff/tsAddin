/* eslint-disable no-param-reassign */
import letterFieldsStore from '../../stores/letterStore/letterFieldsStore';
import { DetailsT, ProductT } from '../../types/types';
import { formatCount } from '../../utils/formatCount';

function getDetailsStr(details: DetailsT[], name: string, measure: string) {
    const detailsStr = details.reduce((total, detailsObj) => {
        const { amount, sort } = detailsObj;
        const formated = formatCount(amount);

        const detailsRow = `- ${name} ${sort} - ${formated} ${measure}`;
        total = `${total}${detailsRow}\n`;
        return total;
    }, '');

    return detailsStr;
}

export const productToStringRu = (product: ProductT) => {
    const { details, info } = product;
    const { desc, producer, periodCreation } = info;
    const {
        standart, expirationDate, pack, fullName,
    } = desc;

    const detailsStr = getDetailsStr(details, fullName, 'кг');

    const packStr = `Упаковка - ${pack}`;
    const producerStr = `Изготовитель: ${producer.name}`;
    const periodStr = `Период изготовления: ${periodCreation}`;
    const expirationStr = `Cрок годности - ${expirationDate} месяцев`;

    const descStr = `${packStr}\n${producerStr}\n${expirationStr}\n${standart}\n${periodStr}\n`;
    const productStr = `${detailsStr}\n${descStr}\n`;

    return productStr;
};

export const productToStringEng = (product: ProductT) => {
    const { ground } = letterFieldsStore.fields;
    const { details, info } = product;
    const { desc, periodCreation } = info;
    const { packEng, nameEng } = desc;

    const detailsStr = getDetailsStr(details, nameEng, 'kg');

    const packStr = `Packing - ${packEng}`;
    const groundStr = `Fishing ground: ${ground}`;
    const periodStr = `Producing period: ${periodCreation}`;
    const portStr = 'Port of discharging: UNKNOWN';
    const descStr = `${packStr}\n${groundStr}\n${periodStr}\n${portStr}`;

    const productStr = `${detailsStr}\n${descStr}\n\n`;

    return productStr;
};
