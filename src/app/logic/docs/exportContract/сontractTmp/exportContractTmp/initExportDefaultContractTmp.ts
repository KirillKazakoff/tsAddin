/* eslint-disable no-param-reassign */
import { CellUtilsDoubleT } from '../../../../../types/typesExcelUtils';
import { initExportContractAddreses } from '../initExportContractAddreses';
import { initExportContractCost } from './initExportContractCost';
import { initExportContractDelivery } from './initExportContractDelivery';
import { initExportContractDeliveryFCA } from './initExportContractDeliveryFCA';
import { initExportContractHeader } from './initExportContractHeader';
import { initExportContractSubject } from './initExportContractSubject';
import { initExportContractDeliveryEXW } from './initExportContractDeliveryEXW';
import { AgreementT } from '../../groupBy/initAgreement';

export const initExportDefaultContractTmp = async (
    utils: CellUtilsDoubleT,
    agreement: AgreementT,
) => {
    initExportContractHeader(utils, agreement);
    initExportContractSubject(utils, agreement);
    initExportContractCost(utils, agreement);

    if (agreement.record.terms === 'FCA') {
        initExportContractDeliveryFCA(utils, agreement);
    } else if (agreement.record.terms === 'EXW') {
        initExportContractDeliveryEXW(utils, agreement);
    } else {
        initExportContractDelivery(utils, agreement);
    }
    initExportContractAddreses(utils, agreement);

    // printAreaSettings
    const lastRow = utils.getRow('Адреса_подпись', 0);
    utils.ws.pageSetup.printArea = `A1:B${lastRow.number}`;

    if (agreement.productsGroupedBy.vessels.all.subject.length === 1) {
        utils.ws.pageSetup.fitToHeight = 1;
        utils.ws.pageSetup.fitToWidth = 1;
        utils.ws.pageSetup.fitToPage = true;
    } else {
        utils.getRow('Доставка_заголовок', -1).addPageBreak();
    }
};
