/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
import letterStore from '../../../stores/letterStore/letterStore';
import { PortZarubezhT } from '../../../stores/spsStore/set/setPortsZarubezh';
import tablesStore from '../../../stores/tablesStore/tablesStore';

export const footerToStrRu = () => {
    const { arrivalVld, payment, port } = letterStore.fields;

    const arrivalStr = `Прибытие в п. ${port.code} ${arrivalVld}`;
    const paymentStr = payment ? `Оплата до ${payment}` : '';
    const conclusionStr = 'В случае Вашей заинтересованности, просим Вас направить предложение';

    return `\n${arrivalStr}\n\n${paymentStr}\n\n${conclusionStr}`;
};

export const footerToStrEng = () => {
    const {
        terms, arrivalForeign, arrivalVld, payment,
    } = letterStore.fields;
    const port = letterStore.fields.port as PortZarubezhT;
    const transport = letterStore.transport.eng.name;

    let weightInformStr = 'Send you weight reports in attached files.';
    if (terms === 'EXW') {
        weightInformStr = 'Send you warehouse certificate reports in attached files.';
    }
    if (tablesStore.matesT[0].product.code === 'мука рыбная') {
        weightInformStr
            += '\nSend to you result of analysis and certificate of warehouse in attached files.';
    }

    const termsStr = `Terms of sale: \n- ${terms} ${port.eng.name}`;
    const arrivalVldStr = `- ETA Vladivostok - ${arrivalVld}`;
    const arrivalForeignStr = `- ETA ${port.eng.name} - ${arrivalForeign}`;
    const scheduleStr = `Schedule ${transport}:\n${arrivalVldStr}\n${arrivalForeignStr}\n\n`;
    const arrivalStr = terms.includes('CFR') ? scheduleStr : '';

    const paymentInfoStr = '- payment 100% during 10 banking days after sign a contract';
    const paymentStr = payment
        ? `\nIf you get interested, please advise us your price offer, we are going to sell this lot at ${payment}`
        : 'If you get interested, please advise us your price offer';

    const addresses = 'Best regards,\nNatalya Kazakova (+7-914-851-60-95)\nStanislav Mesoedov (+7-914-856-26-09)';
    return `\n${weightInformStr}\n\n${arrivalStr}${termsStr}\n${paymentInfoStr}\n${paymentStr}\n${addresses}`;
};
