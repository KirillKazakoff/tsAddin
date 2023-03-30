import ExcelJS from 'exceljs';
import { GetCellBoundT, SetCellBoundT } from '../../../../types/typesUtils';
import { getCellsObj } from '../../../excel/utils/getCellByName';
import { setCellDouble } from '../../../excel/utils/setCell';
import { AgreementT } from '../groupByAggrementNo';
import { initExportContractAddreses } from './initExportContractAddreses';
import { initExportContractCost } from './initExportContractCost';
import { initExportContractDelivery } from './initExportContractDelivery';
import { initExportContractHeader } from './initExportContractHeader';
import { initExportContractSubject } from './initExportContractSubject';

export const initExportContractTmp = (
    book: ExcelJS.Workbook,
    agreement: AgreementT,
) => {
    console.log(agreement);

    const ws = book.getWorksheet('Export_Contract');
    const getCell: GetCellBoundT = getCellsObj.bind(this, ws);
    const setCell: SetCellBoundT = setCellDouble.bind(this, ws);

    initExportContractHeader(getCell, agreement);
    initExportContractSubject(getCell, agreement);
    initExportContractCost(getCell, agreement);
    initExportContractDelivery(getCell, agreement);
    initExportContractAddreses(setCell, agreement);

    ws.pageSetup.fitToPage = true;
    ws.pageSetup.fitToWidth = 1;
    ws.pageSetup.fitToHeight = 1;
};
