export const createBL = () => {
    console.log('create');
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
