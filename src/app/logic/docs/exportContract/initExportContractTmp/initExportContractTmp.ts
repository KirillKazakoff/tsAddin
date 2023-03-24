import ExcelJS from 'exceljs';
import { GetCellBoundT } from '../../../../types/typesUtils';
import { getCellsObj } from '../../../excel/getCellByName';
import { AgreementT } from '../groupByAggrementNo';
import { initExportContractHeader } from './initExportContractHeader';

export const initExportContractTmp = (
    book: ExcelJS.Workbook,
    agreement: AgreementT,
) => {
    console.log(agreement);

    const ws = book.getWorksheet('Export_Contract');
    const getCell: GetCellBoundT = getCellsObj.bind(this, ws);

    initExportContractHeader(getCell, agreement);

    // const subjectCell = getCellExp('Предмет_массив');
    // const subjectCellEng = ws.getCell(subjectCell.row, +subjectCell.col + 1);

    // subjectCell.value = 'Жоа';
    // const rowValues = [4, 'value1', 'value2'];
    // ws.insertRow(+subjectCell.row, rowValues).commit();

    // console.log(subjectCellEng.value);
    // console.log(subjectCell.value);
};
