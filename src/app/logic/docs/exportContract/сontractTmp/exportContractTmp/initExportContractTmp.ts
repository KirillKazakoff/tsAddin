import { InitExportContractTmp } from '../../../../../types/typesExcelUtils';
import { initExcelUtilsDouble } from '../../../../excel/utils/excelUtilsObj/initExcelUtils';
import { initExportContractAddreses } from '../initExportContractAddreses';
import { initExportContractCost } from './initExportContractCost';
import { initExportContractDelivery } from './initExportContractDelivery';
import { initExportContractHeader } from './initExportContractHeader';
import { initExportContractSubject } from './initExportContractSubject';

export const initExportContractTmp: InitExportContractTmp = async (
    book,
    agreement,
) => {
    const ws = book.getWorksheet('Export_Contract');
    const utils = initExcelUtilsDouble(ws, 1);

    initExportContractHeader(utils, agreement);
    initExportContractSubject(utils, agreement);
    initExportContractCost(utils, agreement);
    initExportContractDelivery(utils, agreement);
    initExportContractAddreses(utils, agreement);

    utils.getRow('Доставка_заголовок', -1).addPageBreak();
};
