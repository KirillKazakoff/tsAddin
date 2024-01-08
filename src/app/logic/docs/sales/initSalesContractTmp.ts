import { Workbook } from 'exceljs';
import { initSalesTableRows } from './initSalesTableRows';
import { getSalesContractCells } from './getSalesContractCells';
import { initSalesRowsDefault } from './initSalesRowsDefault';
import { initExcelUtils } from '../../excel/utils/excelUtilsObj/initExcelUtils';
import { SalesGroupT } from './groupSalesContract';

export const initSalesContractTmp = async (book: Workbook, contract: SalesGroupT) => {
    const { seller } = contract.record;
    const ws = book.getWorksheet('Sales_Contract');
    const utils = initExcelUtils(ws, '');

    // init cells
    const cells = getSalesContractCells(contract);
    cells.forEach((cell) => utils.setCell(cell));

    if (contract.record.isLive) {
        initSalesTableRows({
            groups: contract.groupedBy.noGroup,
            isContract: true,
            utils,
        });
    } else {
        initSalesRowsDefault(contract, utils);
    }

    utils.mergeFromTo([
        {
            row: {
                from: { name: 'Контракт_оплата', offset: -1 },
                to: { name: 'Документация_BL', offset: 1 },
            },
            cols: [[1, 5]],
        },
    ]);

    await utils.initPictures(
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
