type GetHrefT = (
    subject: string,
    header: string,
    body: string,
    footer: string
) => string;

export const getHref: GetHrefT = (subject, header, body, footer) => {
    const mailTo = 'oved@sea-wolf.ru';

    const href = `mailto:${mailTo}?subject=${subject}&body=${header}${body}${footer}`;
    const hrefReplaced = href.replace(/\n/g, '%0A');

    console.log('hello');
    return hrefReplaced;
};
