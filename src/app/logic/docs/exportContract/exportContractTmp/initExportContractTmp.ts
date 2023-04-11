import ExcelJS from 'exceljs';
import { initExcelUtilsDouble } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { AgreementT } from '../groupBy/initAgreement';
import { initExportContractAddreses } from './initExportContractAddreses';
import { initExportContractCost } from './initExportContractCost';
import { initExportContractDelivery } from './initExportContractDelivery';
import { initExportContractHeader } from './initExportContractHeader';
import { initExportContractSubject } from './initExportContractSubject';

export const initExportContractTmp = (
    book: ExcelJS.Workbook,
    agreement: AgreementT,
) => {
    const ws = book.getWorksheet('Export_Contract');
    const utils = initExcelUtilsDouble(ws);

    initExportContractHeader(utils, agreement);
    initExportContractSubject(utils, agreement);
    initExportContractCost(utils, agreement);
    initExportContractDelivery(utils, agreement);
    initExportContractAddreses(utils, agreement);
};
