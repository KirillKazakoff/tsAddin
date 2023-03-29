import ExcelJS from 'exceljs';
import { GetCellBoundT } from '../../../../types/typesUtils';
import { getCellsObj } from '../../../excel/utils/getCellByName';
import { AgreementT } from '../groupByAggrementNo';
import { initExportContractCost } from './initExportContractCost';
import { initExportContractHeader } from './initExportContractHeader';
import { initExportContractSubject } from './initExportContractSubject';

export const initExportContractTmp = (
    book: ExcelJS.Workbook,
    agreement: AgreementT,
) => {
    console.log(agreement);

    const ws = book.getWorksheet('Export_Contract');
    const getCell: GetCellBoundT = getCellsObj.bind(this, ws);

    initExportContractHeader(getCell, agreement);
    initExportContractSubject(getCell, agreement);
    initExportContractCost(getCell, agreement);

    ws.pageSetup.fitToPage = true;
    ws.pageSetup.fitToWidth = 1;
    ws.pageSetup.fitToHeight = 1;
};
