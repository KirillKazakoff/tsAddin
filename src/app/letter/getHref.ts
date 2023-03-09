import letterStore from '../stores/letterStore/letterStore';
import { letter } from './letter';

export const getHref = () => {
    const { isExport } = letterStore.fields;

    const key = isExport ? 'eng' : 'ru';
    const {
        getSubject, getHeader, getBody, getFooter, mailTo,
    } = letter[key];

    const subject = getSubject();
    const body = getBody();
    const header = getHeader();
    const footer = getFooter();

    const bodyHref = encodeURIComponent(`${header}${body}${footer}`);

    const href = `mailto:${mailTo}?subject=${subject}&body=${bodyHref}&from=${mailTo}`;
    const hrefReplaced = href.replace(/\n/g, '%0A');

    return hrefReplaced;
};
