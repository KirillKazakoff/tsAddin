import letterStore from '../stores/letterStore';
import { getBody } from './getBody';
import { getFooter } from './getFooter';
import { getHeaderLetter } from './getHeader';
import { getSubject } from './getSubject';

type GetHrefT = (dateArrival: string, datePayment: string, port: string) => string;

export const useGetHref = () => {
    const getHref: GetHrefT = (dateArrival, datePayment, port) => {
        const {
            operation, table, transport, vessels,
        } = letterStore.letter;
        const mocha = vessels.map((vessel) => vessel.name);

        const subject = getSubject();
        const header = getHeaderLetter(mocha, transport.name);
        const body = getBody(table, mocha);
        const footer = getFooter(dateArrival, datePayment, port);

        const mailTo = 'oved@sea-wolf.ru';

        const href = `mailto:${mailTo}?subject=${subject}&body=${header}${body}${footer}`;
        const hrefReplaced = href.replace(/\n/g, '%0A');

        console.log('hello');
        return hrefReplaced;
    };

    return getHref;
};
