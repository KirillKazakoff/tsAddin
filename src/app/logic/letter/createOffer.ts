import letterStore from '../../stores/letterStore/letterStore';
import { offerDictionary } from './offerDictionary';

export const createOffer = () => {
    const { isExport } = letterStore.fields;

    const key = isExport ? 'eng' : 'ru';
    const {
        getSubject, getHeader, getBody, getFooter, mailTo,
    } = offerDictionary[key];

    const subject = getSubject();
    const body = getBody();
    const header = getHeader();
    const footer = getFooter();

    const bodyHref = encodeURIComponent(`${header}${body}${footer}`);

    const href = `mailto:${mailTo}?subject=${subject}&body=${bodyHref}&from=${mailTo}`;
    const hrefReplaced = href.replace(/\n/g, '%0A');

    return hrefReplaced;
};
