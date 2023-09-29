/* eslint-disable no-param-reassign */
import { CellUtilsDoubleT } from '../../../../../types/typesExcelUtils';
import { initExportContractCost } from './initExportContractCost';
import { initExportContractSubject } from './initExportContractSubject';
import { AgreementT } from '../../groupBy/initAgreement';
import { initExportContractDelivery } from './initExportContractDelivery';

export const initExportDefaultContractTmp = async (
    utils: CellUtilsDoubleT,
    agreement: AgreementT,
) => {
    initExportContractSubject(utils, agreement);
    initExportContractCost(utils, agreement);
    initExportContractDelivery(utils, agreement);

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
