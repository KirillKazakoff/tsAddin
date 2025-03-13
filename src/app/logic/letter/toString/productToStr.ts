/* eslint-disable no-param-reassign */
import offerStore from '../../../stores/mailStores/offerStore';
import { DetailsT, ProductT } from '../../../types/typesLetter';
import { isStOff } from '../common/isStOff';
import { p } from '../../utils/constants';
import { PortZarubezhT } from '../../../stores/spsStore/set/setPortsZarubezh';

function getDetailsStr(details: DetailsT[], name: string, measure: string) {
    const detailsStr = details.reduce((total, detailsObj) => {
        const sort = isStOff(detailsObj.sort) ? '' : detailsObj.sort;
        const amount = detailsObj.amount.str;

        const detailsRow = `- ${name} ${sort} - ${amount} ${measure}`;
        total = `${total}${detailsRow}\n`;
        return total;
    }, '');

    return detailsStr;
}

export const productToStringRu = (product: ProductT) => {
    const { details, info } = product;
    const { desc, producer } = info;
    const { standart, expirationDate } = desc;

    const detailsStr = getDetailsStr(details, desc.ru.name, 'кг');

    const packStr = `${p.TAB}Упаковка - ${desc.ru.pack}`;
    const producerStr = `${p.TAB}Изготовитель: ${producer.ru.name}`;
    const periodStr = `${p.TAB}Период изготовления: XXX`;
    const expirationStr = `${p.TAB}Cрок годности - ${expirationDate} месяцев`;
    const standartStr = `${p.TAB}${standart}`;

    const descStr = `${packStr}\n${producerStr}\n${expirationStr}\n${standartStr}\n${periodStr}\n`;
    const productStr = `${detailsStr}\n${descStr}\n`;

    return productStr;
};

export const productToStringEng = (product: ProductT) => {
    const { ground } = offerStore.fields;
    const { details, info } = product;
    const { desc } = info;
    const port = offerStore.fields.port as PortZarubezhT;

    const detailsStr = getDetailsStr(details, desc.eng.name, 'kg');

    const packStr = `${p.TAB}Packing - ${desc.eng.pack}`;
    const groundStr = `${p.TAB}Fishing ground: ${ground}`;
    const periodStr = `${p.TAB}Producing period: `;
    const portStr = `${p.TAB}Port of discharging: ${port.eng.name}`;
    const descStr = `${packStr}\n${groundStr}\n${periodStr}\n${portStr}`;

    const productStr = `${detailsStr}\n${descStr}\n\n`;

    return productStr;
};
