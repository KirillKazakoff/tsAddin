import ExcelJS from 'exceljs';
import { initExcelUtilsDouble } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
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
    // console.log(agreement);

    const ws = book.getWorksheet('Export_Contract');
    const {
        getCell, setCell, deleteRow, getRow,
    } = initExcelUtilsDouble(ws);

    initExportContractHeader(getCell, agreement);
    initExportContractSubject(getCell, agreement);
    initExportContractCost(getCell, agreement);
    initExportContractDelivery(getCell, agreement);
    initExportContractAddreses(
        {
            getCell,
            setCell,
            ws,
            deleteRow,
            getRow,
        },
        agreement,
    );
};
