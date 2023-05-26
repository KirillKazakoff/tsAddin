import exportContractStore from '../../../../../stores/docsStores/exportContractStore';
import { InitContractPartT } from '../../../../../types/typesExcelUtils';

export const initExportContractDeliveryZarubino: InitContractPartT = (
    utils,
    agreement,
) => {
    const cellName = 'Доставка_условия';
    const { consignee } = agreement.record;

    utils.setCell({
        cell: cellName,
        eng: '3.1 Supply of products is carried out on FCA Terms.\nAcceptance- transfer of Goods by quantity and quality is made on the territory of the Russian Federation in Zarubino.',
        ru: '3.1 Поставка осуществляется на условиях FCA.\nПриемка-передача Товара по количеству и качеству производится на территории Российской Федерации в п. Зарубино',
    });
    utils.setCell({
        cell: cellName,
        eng: `3.4 The Parties have agreed that the acceptance and transfer of the batch of Goods in the settlement of Zarubino on behalf of the Buyer will be carried out by: ${consignee.fullName} ${consignee.addres}`,
        ru: `3.4 Стороны пришли к соглашению, что приемку-передачу партии Товара в п. Зарубино от имени покупателя будет осуществлять: ${consignee.fullName} ${consignee.addres}`,
        offsetRow: 1,
    });
    utils.setCell({
        cell: cellName,
        eng: `Expected delivery date ${exportContractStore.dischargeDate}`,
        ru: `Дата поставки ориентировочно ${exportContractStore.dischargeDate}`,
        offsetRow: 2,
    });

    const termsRow = utils.getRow(cellName, 0);
    termsRow.height = 50;

    const partiesRow = utils.getRow(cellName, 1);
    partiesRow.height = 80;

    const deliveryDateRow = utils.getRow(cellName, 2);
    deliveryDateRow.height = 30;

    [3, 4].forEach((i) => utils.deleteRow(cellName, i));
    // const row = utils.getRow('Прочие_условия_заголовок', 0);
    utils.deleteRow('Прочие_условия_заголовок');
};
