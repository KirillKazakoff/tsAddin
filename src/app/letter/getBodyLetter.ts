// /* eslint-disable no-param-reassign */
// import { BodyRowT, TableRowT } from '../types/types';

// const initialValue = { vesselName: '', production: [] };

// export const getBodyLetter = (table: TableRowT[], vessels: string[]) => {
//     return vessels.reduce<BodyRowT[]>((body, vessel) => {
//         const bodyRowGrouped = table.reduce<BodyRowT>((bodyRow, tableRow) => {
//             if (tableRow.vessel !== vessel) return bodyRow;

//             bodyRow.vesselName = vessel;
//             return bodyRow;
//         }, initialValue);

//         body.push(bodyRowGrouped);
//         return body;
//     }, []);
// };
