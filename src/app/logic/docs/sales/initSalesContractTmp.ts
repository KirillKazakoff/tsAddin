import { Workbook } from 'exceljs';
import { initPicturesExcel } from '../../excel/pictures/initPictureExcel';
import { SalesContractT } from './groupBy/initSalesContract';
import { initExcelUtils } from '../../excel/utils/excelUtilsObj/initExcelUtils';
import { initSalesRowsLive } from './initSalesRowsLive';
import { getSalesContractCells } from './getSalesContractCells';
import { initSalesRowsDefault } from './initSalesRowsDefault';

export const initSalesContractTmp = async (
    book: Workbook,
    contract: SalesContractT,
) => {
    const { seller } = contract.record;
    const ws = book.getWorksheet('Sales_Contract');
    const utils = initExcelUtils(ws);

    // initCells
    const cells = getSalesContractCells(contract);
    cells.forEach((cell) => utils.setCell(cell));

    if (contract.record.isLive) {
        initSalesRowsLive({
            rows: contract.rows,
            isContract: true,
            utils,
        });
    } else {
        initSalesRowsDefault(contract, utils);
    }

    // initPictures
    await initPicturesExcel(
        [
            {
                key: seller.code,
                rangeObj: {
                    start: 'Sign_seller_start',
                    end: 'Sign_seller_end',
                },
                ws,
            },
        ],
        true,
    );
};
