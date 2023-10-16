import { Workbook } from 'exceljs';
import { initPicturesExcel } from '../../excel/pictures/initPictureExcel';
import { SalesContractT } from './groupBy/initSalesContract';
import { initExcelUtils } from '../../excel/utils/excelUtilsObj/initExcelUtils';
import { initSalesTableRows } from './initSalesTableRows';
import { getSalesContractCells } from './getSalesContractCells';
import { initSalesRowsDefault } from './initSalesRowsDefault';
import { mergeFromTo } from '../../excel/utils/excelUtilsObj/mergeCells';

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
    mergeFromTo(utils.ws, {
        row: {
            from: { name: 'Контракт_оплата', offset: -1 },
            to: { name: 'Документация_BL', offset: 1 },
        },
        cols: [[1, 5]],
    });

    await initPicturesExcel(
        ws,
        [
            {
                key: seller.code,
                range: {
                    start: 'Sign_seller_start_1',
                    end: 'Sign_seller_end_1',
                },
            },
            {
                key: seller.code,
                range: {
                    start: 'Sign_seller_start_2',
                    end: 'Sign_seller_end_2',
                },
            },
        ],
        true,
    );

    utils.getRow('Контракт_продавец_печать_подвал_1', 0).addPageBreak();
};
