import letterFieldsStore from '../stores/letterStore/letterFieldsStore';
import { letter } from './letter';

export const getHref = () => {
    const { operation } = letterFieldsStore.fields;

    const {
        getSubject, getHeader, getBody, getFooter,
    } = letter[operation];

    const mailTo = 'oved@sea-wolf.ru';

    const subject = getSubject();
    const body = getBody();
    const header = getHeader();
    const footer = getFooter();

    const bodyHref = encodeURIComponent(`${header}${body}${footer}`);

    const href = `mailto:${mailTo}?subject=${subject}&body=${bodyHref}`;
    const hrefReplaced = href.replace(/\n/g, '%0A');

    return hrefReplaced;
};
