import ExcelJS from 'exceljs';
import { GetCellBoundT, SetCellBoundT } from '../../../../types/typesUtils';
import { getCellsObj } from '../../../excel/utils/getCellByName';
import { setCellDouble } from '../../../excel/utils/setCell';

export const initComInvoiceTmp = (book: ExcelJS.Workbook) => {
    const ws = book.getWorksheet('Com_Invoice');

    const getCell: GetCellBoundT = getCellsObj.bind(this, ws);
    const setCell: SetCellBoundT = setCellDouble.bind(this, ws);
};
