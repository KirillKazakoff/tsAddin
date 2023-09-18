import { Workbook } from 'exceljs';
import { SalesContractT } from '../logic/docs/sales/groupBy/initSalesContract';
import { CellUtilsT } from './typesExcelUtils';

export type initSalesContractPartT = (
    book: Workbook,
    contract: SalesContractT
) => void;
