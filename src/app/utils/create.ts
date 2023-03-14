// import Excel from 'exceljs';
// import { saveAs } from 'file-saver';

// const workbook = new Excel.Workbook();

// const worksheet = workbook.addWorksheet('People');
// worksheet.columns = [
//     { header: 'Id', key: 'id', width: 10 },
//     { header: 'Name', key: 'name', width: 10 },
//     { header: 'D.O.B.', key: 'DOB', width: 30 },
// ];
// worksheet.addRow([10086, 'Ken1', 'YYYY-MM-DD']);
// worksheet.addRow([10087, 'Ken2', 'YYYY-MM-DD']);
// worksheet.addRow([10088, 'Ken3', 'YYYY-MM-DD']);

// export async function saveFile() {
//     const xls64 = await workbook.xlsx.writeBuffer();
//     saveAs(new Blob([xls64]), 'result.xlsx');
// }

import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export async function saveFile(workbook: ExcelJS.Workbook, id) {
    try {
        const xls64 = await workbook.xlsx.writeBuffer();
        const blob = new Blob([xls64]);
        saveAs(blob, `${id}.xlsx`);
    } catch (e) {
        console.log(e);
    }
}
