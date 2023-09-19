/* eslint-disable @typescript-eslint/no-namespace */
import { Workbook } from 'exceljs';
import { SalesContractT } from '../logic/docs/sales/groupBy/initSalesContract';
import { CellUtilsT } from './typesExcelUtils';

export type SalesContractTmpSettingsT = {
    book: Workbook;
    contract: SalesContractT;
    utils: CellUtilsT;
};

// export namespace SalesContract {
//     export type Params = {
//         book: Workbook;
//         contract: SalesContractT;
//     };
// }
