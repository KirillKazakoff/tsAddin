import letterFieldsStore from '../../stores/letterStore/letterFieldsStore';

export const footerToStrRu = () => {
    const { dateArrival, datePayment, port } = letterFieldsStore.fields;

    const arrivalStr = `Прибытие в п. ${port} ${dateArrival}`;
    const paymentStr = `Оплата до ${datePayment}`;
    const conclusionStr = 'В случае Вашей заинтересованности, просим Вас направить предложение';

    return `\n${arrivalStr}\n${paymentStr}\n${conclusionStr}`;
};

export const footerToStrEng = () => {
    const {
        port, terms, dateArrival, datePayment,
    } = letterFieldsStore.fields;

    const weightInformStr = 'Send for you weight reports in attached files.';
    const arrivalStr = `ETA ${port} - ${dateArrival}`;
    const termsStr = `Terms of sale:\n\n-${terms} ${port}`;
    const paymentStr = '- payment 100% during 10 banking days after sign a contract';
    const conclusionStr = `If you get interested, please advise us your price offer, we are going to sell this lot at ${datePayment}`;

    return `\n${weightInformStr}\n${arrivalStr}\n${termsStr}\n${paymentStr}\n\n${conclusionStr}`;
};
