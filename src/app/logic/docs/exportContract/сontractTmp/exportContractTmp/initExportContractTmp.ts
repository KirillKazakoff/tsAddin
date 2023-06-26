import { InitExportContractTmp } from '../../../../../types/typesExcelUtils';
import { initExcelUtilsDouble } from '../../../../excel/utils/excelUtilsObj/initExcelUtils';
import { initExportContractAddreses } from '../initExportContractAddreses';
import { initExportContractCost } from './initExportContractCost';
import { initExportContractDelivery } from './initExportContractDelivery';
import { initExportContractDeliveryFCA } from './initExportContractDeliveryFCA';
import { initExportContractHeader } from './initExportContractHeader';
import { initExportContractSubject } from './initExportContractSubject';
import { initExportContractDeliveryEXW } from './initExportContractDeliveryEXW';

export const initExportContractTmp: InitExportContractTmp = async (
    book,
    agreement,
) => {
    const ws = book.getWorksheet('Export_Contract');
    const utils = initExcelUtilsDouble(ws, 1);

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
    ws.pageSetup.printArea = `A1:B${lastRow.number}`;

    if (agreement.productsGroupedBy.vessels.all.subject.length === 1) {
        ws.pageSetup.fitToHeight = 1;
        ws.pageSetup.fitToWidth = 1;
        ws.pageSetup.fitToPage = true;
    } else {
        utils.getRow('Доставка_заголовок', -1).addPageBreak();
    }
};
