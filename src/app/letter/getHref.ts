import letterFieldsStore from '../stores/letterStore/letterFieldsStore';
import { letter } from './letter';

export const getHref = () => {
    const { isExport } = letterFieldsStore.fields;

    const key = isExport ? 'eng' : 'ru';
    const {
        getSubject, getHeader, getBody, getFooter,
    } = letter[key];

    const mailTo = 'oved@sea-wolf.ru';

    const subject = getSubject();
    const body = getBody();
    const header = getHeader();
    const footer = getFooter();

    const bodyHref = encodeURIComponent(`${header}${body}${footer}`);

    const href = `mailto:${mailTo}?subject=${subject}&body=${bodyHref}`;
    console.log(href);
    const hrefReplaced = href.replace(/\n/g, '%0A');

    return hrefReplaced;
};
