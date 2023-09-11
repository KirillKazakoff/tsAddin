import exportContractStore from '../../../../../stores/docsStores/exportContractStore';
import { InitContractPartT } from '../../../../../types/typesExcelUtils';

export const initExportContractDeliveryFCA: InitContractPartT = (
    utils,
    agreement,
) => {
    const { consignee, portTo } = agreement.record;

    utils.setCell({
        cell: 'Доставка_условия',
        eng: `3.1 Supply of products is carried out on FCA Terms.\nAcceptance- transfer of Goods by quantity and quality is made on the territory of: ${portTo.eng.countryFull} in ${portTo.eng.name}.`,
        ru: `3.1 Поставка осуществляется на условиях FCA.\nПриемка-передача Товара по количеству и качеству производится на территории: ${portTo.ru.countryFull} в п. ${portTo.ru.name}`,
    });
    utils.setCell({
        cell: 'Доставка_приемка',
        eng: `3.4 The Parties have agreed that the acceptance and transfer of the batch of Goods in the settlement of ${portTo.eng.name} on behalf of the Buyer will be carried out by: ${consignee.fullName} ${consignee.addres}`,
        ru: `3.4 Стороны пришли к соглашению, что приемку-передачу партии Товара в п. ${portTo.ru.name} от имени покупателя будет осуществлять: ${consignee.fullName} ${consignee.addres}`,
    });
    utils.setCell({
        cell: 'Доставка_дата',
        eng: `Expected delivery date: ${exportContractStore.fields.departureDate}`,
        ru: `Дата поставки ориентировочно: ${exportContractStore.fields.departureDate}`,
    });
};
