import { InitContractPartT } from '../../../../../types/typesExcelUtils';

export const initExportContractDeliveryEXW: InitContractPartT = (
    utils,
    agreement,
) => {
    const { terms, portTo } = agreement.record;

    utils.setCell({
        cell: 'Доставка_условия',
        eng: `3.1 The commodity should be delivered under terms of ${terms} ${portTo.eng.name}`,
        ru: `3.1 Поставка осуществляется на условиях ${terms} ${portTo.ru.name}`,
    });
    utils.setCell({
        cell: 'Доставка_порт',
        eng: `3.5 The delivery of goods to Buyer, mentioned in clause 1.1 of this Agreement should be carried in port of destination ${portTo.eng.name}, ${portTo.eng.country}`,
        ru: `3.5 Передача Покупателю Товара, оговоренного в п.1.1. настоящего Дополнения будет производиться в порту назначения ${portTo.ru.name}, ${portTo.ru.country}`,
    });

    utils.deleteRow('Сертификаты_массив');
    utils.deleteRow('Сертификаты_описание');
};
