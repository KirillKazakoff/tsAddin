import { Workbook } from 'exceljs';
import { initSalesTableRows } from './initSalesTableRows';
import { getSalesContractCells } from './getSalesContractCells';
import { initSalesDefaultRows } from './initSalesRowsDefault';
import { initExcelUtils } from '../../excel/utils/excelUtilsObj/initExcelUtils';
import { SalesGroupT } from './groupSalesContract';

export const initSalesContractTmp = async (book: Workbook, contract: SalesGroupT) => {
    const { seller } = contract.record;
    const ws = book.getWorksheet('Sales_Contract');
    const utils = initExcelUtils(ws, '');

    await utils.initTmp({
        cells: getSalesContractCells(contract),
        initRows: () => {
            if (contract.record.isLive) {
                initSalesTableRows({
                    groups: contract.groupedBy.noGroup,
                    isContract: true,
                    utils,
                });
            } else {
                initSalesDefaultRows(contract, utils);
            }
        },
        mergeCells: [
            {
                row: {
                    from: { name: 'Контракт_оплата', offset: -1 },
                    to: { name: 'Документация_BL', offset: 1 },
                },
                cols: [[1, 5]],
            },
        ],
        pictureSettings: {
            isActive: true,
            settings: [
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
        },
        pageBreakCellName: 'Контракт_продавец_печать_подвал_1',
    });
};
