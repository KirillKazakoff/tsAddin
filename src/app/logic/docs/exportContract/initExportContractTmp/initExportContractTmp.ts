import ExcelJS from 'exceljs';
import {
    GetCellDoubleBoundT,
    SetCellDoubleBoundT,
} from '../../../../types/typesUtils';
import { getCellsObj } from '../../../excel/utils/cellUtils/getCellByName';
import { setCellDouble } from '../../../excel/utils/cellUtils/setCell';
import { AgreementT } from '../groupBy/initAgreement';
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

    const getCell: GetCellDoubleBoundT = getCellsObj.bind(this, ws);
    const setCell: SetCellDoubleBoundT = setCellDouble.bind(this, ws);

    initExportContractHeader(getCell, agreement);
    initExportContractSubject(getCell, agreement);
    initExportContractCost(getCell, agreement);
    initExportContractDelivery(getCell, agreement);
    initExportContractAddreses({ getCell, setCell, ws }, agreement);
};
