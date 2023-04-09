import { Workbook } from 'exceljs';
import { initExcelUtilsDouble } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { AgreementT } from '../groupBy/initAgreement';

export const initExportContractTmpNew = (book: Workbook, agreement: AgreementT) => {
    const ws = book.getWorksheet('Export_Contract');
    const utils = initExcelUtilsDouble(ws);
};
