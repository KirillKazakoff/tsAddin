import { Workbook } from 'exceljs';
import { initExcelUtils } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { ContractT } from '../groupByContractNo';

export const initPortLetterTmp = (book: Workbook, contract: ContractT) => {
    const ws = book.getWorksheet('Port_Letter');
    const utils = initExcelUtils(ws);
    const { setCell } = utils;

    const { record, rows } = contract;
};
