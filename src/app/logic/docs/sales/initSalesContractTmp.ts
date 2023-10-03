import { Workbook } from 'exceljs';
import { initPicturesExcel } from '../../excel/pictures/initPictureExcel';
import { SalesContractT } from './groupBy/initSalesContract';
import { initExcelUtils } from '../../excel/utils/excelUtilsObj/initExcelUtils';
import { initSalesTableRows } from './initSalesTableRows';
import { getSalesContractCells } from './getSalesContractCells';
import { initSalesRowsDefault } from './initSalesRowsDefault';

export const initSalesContractTmp = async (
    book: Workbook,
    contract: SalesContractT,
) => {
    const { seller } = contract.record;
    const ws = book.getWorksheet('Sales_Contract');
    const utils = initExcelUtils(ws);

    // init cells
    const cells = getSalesContractCells(contract);
    cells.forEach((cell) => utils.setCell(cell));

    if (contract.record.isLive) {
        initSalesTableRows({
            rows: contract.rows,
            isContract: true,
            utils,
        });
    } else {
        initSalesRowsDefault(contract, utils);
    }

    // merge cells
    const startRow = utils.getRow('Контракт_оплата', -1).number;
    const endRow = utils.getRow('Документация_BL', 1).number;
    for (let i = startRow; i < endRow; i += 1) {
        utils.mergeCells({ startCol: 1, endCol: 5, row: i });
    }

    await initPicturesExcel(
        [
            {
                key: seller.code,
                rangeObj: {
                    start: 'Sign_seller_start_1',
                    end: 'Sign_seller_end_1',
                },
                ws,
            },
            {
                key: seller.code,
                rangeObj: {
                    start: 'Sign_seller_start_2',
                    end: 'Sign_seller_end_2',
                },
                ws,
            },
        ],
        true,
    );

    utils.getRow('Контракт_продавец_печать_подвал_1', 0).addPageBreak();
};
