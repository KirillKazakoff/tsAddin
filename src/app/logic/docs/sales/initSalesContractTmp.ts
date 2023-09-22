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
        // merge contract tmp cells
        const startRow = utils.getRow('Контракт_всего_цена', 0).number;
        const endRow = utils.getRow('Документация_BL', 1).number;
        for (let i = startRow; i < endRow; i += 1) {
            utils.mergeCells({ startCol: 1, endCol: 5, row: i });
        }
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
