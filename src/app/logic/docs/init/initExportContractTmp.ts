import ExcelJS from 'exceljs';
import type { ExportRowT } from '../../../types/typesTables';
import { getCellByName } from '../../excel/getCellByName';

export const initExportContractTmp = (book: ExcelJS.Workbook, row: ExportRowT) => {
    const ws = book.getWorksheet('Export_Contract');

    const getCellExp: (name: string) => ExcelJS.Cell = getCellByName.bind(this, ws);

    const subjectCell = getCellExp('Предмет_массив');
    const subjectCellEng = ws.getCell(subjectCell.row, +subjectCell.col + 1);

    subjectCell.value = 'Жоа';
    const rowValues = [4, 'value1', 'value2'];
    ws.insertRow(+subjectCell.row, rowValues).commit();
    // ws.commit();
    // const table = ws.getTable('Предмет_массив');
    // console.log(table);

    console.log(subjectCellEng.value);
    console.log(subjectCell.value);
};
