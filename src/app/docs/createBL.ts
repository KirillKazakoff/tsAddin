/* eslint-disable import/no-extraneous-dependencies */
import ExcelJS from 'exceljs';
import _ from 'lodash';
import { getCellByName } from '../utils/getCellByName';
import tablesStore from '../stores/tablesStore/tablesStore';
import { selectSellerSp } from '../stores/spsStore/select';
import { saveFile } from '../utils/create';

export const createBL = async (book: ExcelJS.Workbook) => {
    try {
        tablesStore.export.forEach((row) => {
            const newBook = _.cloneDeep(book);
            const blWs = newBook.getWorksheet('BL');
            const sellerCell = getCellByName(blWs, 'Продавец');

            console.log(row.seller);
            const sellerSp = selectSellerSp(row.seller);
            sellerCell.value = sellerSp.nameEng;
            saveFile(newBook, row.seller);
        });
    } catch (e) {
        console.log(e);
    }
};

// /* eslint-disable no-param-reassign */
// import { getCompanyEngName } from './getCompanyEngName';
// import { getCompanyName } from './getCompanyName';
// import { read } from './readBL';

// export const createBL = async () => {
//     console.log('start');

//     const blBook = await read();
//     const blWs = blBook.getWorksheet('BL');
//     const exportStorageWs = movementBook.getWorksheet('Экспорт');

//     const blIdCell = blWs.getCell('A14');
//     const blCompanyNameCell = blWs.getCell('A2');

//     const blCol = blWs.getColumn('Z');
//     const blArray: string[] = [];
//     blCol.eachCell((cell: any) => {
//         const { value } = cell;

//         if (!value) return;
//         if (typeof value === 'object') {
//             blArray.push(value.result);
//             return;
//         }
//         blArray.push(cell.value);
//     });

//     blWs.eachRow((row: any) => row.eachCell((cell: any) => {
//         if (!cell?.value?.result) return;
//         const { result, model } = cell.value;

//         cell.value = result;

//         if (model) {
//             cell.value.model = undefined;
//         }
//     }));

//     blArray.forEach((blId) => {
//         blIdCell.value = blId;
//         const companyName = getCompanyName(exportStorageWs, blIdCell);
//         blCompanyNameCell.value = getCompanyEngName(dictionaryBook, companyName);
//         console.log(blCompanyNameCell);
//         copy.xlsx.writeFile(`${blId}.xlsx`);
//     });
// };
