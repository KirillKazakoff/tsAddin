import letterFieldsStore from '../stores/letterStore/letterFieldsStore';
import { letter } from './letter';

export const getHref = () => {
    const { operation } = letterFieldsStore.fields;

    const {
        getSubject, getHeader, getBody, getFooter,
    } = letter[operation];

    const mailTo = 'oved@sea-wolf.ru';

    const href = `mailto:${mailTo}?subject=${getSubject()}&body=${getHeader()}${getBody()}${getFooter()}`;
    const hrefReplaced = href.replace(/\n/g, '%0A');

    return hrefReplaced;
};
