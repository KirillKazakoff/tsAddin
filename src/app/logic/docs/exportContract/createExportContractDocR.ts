import { InitExportContractTmp } from '../../../types/typesExcelUtils';
import { initExcelUtilsDouble } from '../../excel/utils/excelUtilsObj/initExcelUtils';
import { initExportStorageContractTmp } from './сontractTmp/exportStorageContractTmp/initExportStorageContractTmp';

export const createExportContractDocR: InitExportContractTmp = async (
    book,
    agreement,
) => {
    const ws = book.getWorksheet('Export_Storage_Contract');
    const utils = initExcelUtilsDouble(ws, 2);
    initExportStorageContractTmp(book, agreement);
};
