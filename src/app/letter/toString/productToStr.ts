/* eslint-disable no-param-reassign */
import letterFieldsStore from '../../stores/letterStore/letterFieldsStore';
import { DetailsT, ProductT } from '../../types/types';
import { formatCount } from '../../utils/formatCount';
import { isStOff } from '../common/isSameSort';

const TAB = '   ';

function getDetailsStr(details: DetailsT[], name: string, measure: string) {
    const detailsStr = details.reduce((total, detailsObj) => {
        const sort = isStOff(detailsObj) ? '' : detailsObj.sort;
        const amount = formatCount(detailsObj.amount);

        const detailsRow = `- ${name} ${sort} - ${amount} ${measure}`;
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

    const packStr = `${TAB}Упаковка - ${pack}`;
    const producerStr = `${TAB}Изготовитель: ${producer.name}`;
    const periodStr = `${TAB}Период изготовления: ${periodCreation}`;
    const expirationStr = `${TAB}Cрок годности - ${expirationDate} месяцев`;

    const descStr = `${packStr}\n${producerStr}\n${expirationStr}\n${standart}\n${periodStr}\n`;
    const productStr = `${detailsStr}\n${descStr}\n`;

    return productStr;
};

export const productToStringEng = (product: ProductT) => {
    const { ground, port } = letterFieldsStore.fields;
    const { details, info } = product;
    const { desc, periodCreation } = info;
    const { packEng, nameEng } = desc;

    const detailsStr = getDetailsStr(details, nameEng, 'kg');

    const packStr = `${TAB}Packing - ${packEng}`;
    const groundStr = `${TAB}Fishing ground: ${ground}`;
    const periodStr = `${TAB}Producing period: ${periodCreation}`;
    const portStr = `${TAB}Port of discharging: ${port}`;
    const descStr = `${packStr}\n${groundStr}\n${periodStr}\n${portStr}`;

    const productStr = `${detailsStr}\n${descStr}\n\n`;

    return productStr;
};
