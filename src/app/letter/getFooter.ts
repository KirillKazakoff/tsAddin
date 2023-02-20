export const getFooter = (
    dateArrival: string,
    datePayment: string,
    port: string,
) => {
    const arrivalStr = `Прибытие в п. ${port} ${dateArrival}`;
    const paymentStr = `Оплата до ${datePayment}`;
    const finalStr = 'В случае Вашей заинтересованности, просим Вас направить предложение';

    return `\n${arrivalStr}\n${paymentStr}\n${finalStr}`;
};
