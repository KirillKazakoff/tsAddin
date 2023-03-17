import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export async function saveFile(workbook: ExcelJS.Workbook, id) {
    const xls64 = await workbook.xlsx.writeBuffer();
    const blob = new Blob([xls64]);
    saveAs(blob, `${id}.xlsx`);
}
