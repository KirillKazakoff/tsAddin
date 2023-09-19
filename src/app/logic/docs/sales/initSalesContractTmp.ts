import { Workbook } from 'exceljs';
import { initPicturesExcel } from '../../excel/pictures/initPictureExcel';
import { SalesContractT } from './groupBy/initSalesContract';
import { initExcelUtils } from '../../excel/utils/excelUtilsObj/initExcelUtils';
import { initSalesRowsLive } from './initSalesRowsLive';
import { getSalesContractCells } from './getSalesContractCells';

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

    initSalesRowsLive({
        rows: contract.rows,
        isContract: true,
        utils,
    });

    // initPictures
    const rangeCellNames = [
        ['Sign_seller_start', 'Sign_seller_end'],
        ['Invoice_sign_seller_start', 'Invoice_sign_seller_end'],
    ];

    await Promise.all(
        rangeCellNames.map(([start, end]) => initPicturesExcel(
            [
                {
                    key: seller.code,
                    rangeObj: {
                        start,
                        end,
                    },
                    ws,
                },
            ],
            true,
        )),
    );
};
