/* eslint-disable no-useless-escape */
import letterStore from '../../../stores/letterStore/letterStore';
import spsStore from '../../../stores/spsStore/spsStore';

export const footerToStrRu = () => {
    const { arrivalVld, payment, port } = letterStore.fields;

    const arrivalStr = `Прибытие в п. ${port} ${arrivalVld}`;
    const paymentStr = `Оплата до ${payment}`;
    const conclusionStr = 'В случае Вашей заинтересованности, просим Вас направить предложение';

    return `\n${arrivalStr}\n\n${paymentStr}\n\n${conclusionStr}`;
};

export const footerToStrEng = () => {
    const {
        port, terms, arrivalForeign, payment, arrivalVld,
    } = letterStore.fields;
    const transport = spsStore.transport.nameEng;

    const weightInformStr = 'Send for you weight reports in attached files.';
    const termsStr = `Terms of sale: \n- ${terms} ${port}`;

    const arrivalVldStr = `- ETA Vladivostok - ${arrivalVld}`;
    const arrivalForeignStr = `- ETA ${port} - ${arrivalForeign}`;
    const scheduleStr = `Schedule ${transport}:\n${arrivalVldStr}\n${arrivalForeignStr}\n\n`;
    const arrivalStr = terms === 'CFR' ? scheduleStr : '';

    const paymentInfoStr = '- payment 100% during 10 banking days after sign a contract';
    const paymentStr = `If you get interested, please advise us your price offer, we are going to sell this lot at ${payment}`;

    return `\n${weightInformStr}\n\n${arrivalStr}${termsStr}\n${paymentInfoStr}\n\n${paymentStr}`;
};
