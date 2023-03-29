import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { fetchSendXls } from '../../api/api';

export async function saveFile(workbook: ExcelJS.Workbook, id) {
    const xls64 = await workbook.xlsx.writeBuffer();
    const blob = new Blob([xls64]);

    const formData = new FormData();
    formData.append('file', blob, blob.name);
    await fetchSendXls(formData);
    // saveAs(blob, `${id}.xlsx`);
}
