/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import { Workbook } from 'exceljs';
import _ from 'lodash';
import { SalesContractT } from './groupBy/initSalesContract';
import { initExcelUtils } from '../../excel/utils/excelUtilsObj/initExcelUtils';
import { CellObjT } from '../../../types/typesExcelUtils';
import { getExcelDateStr } from '../../excel/utils/getExcelDate';
import { initPicturesExcel } from '../../excel/pictures/initPictureExcel';
import { initSalesTableRows } from './initSalesTableRows';
import { SalesRowT } from '../../../types/typesTables';

export const initSalesInvoiceTmp = async (
    book: Workbook,
    contract: SalesContractT,
) => {
    const r = contract.record;
    const ws = book.getWorksheet('Invoice');
    const utils = initExcelUtils(ws);

    // init cells
    // prettier-ignore
    const cells: CellObjT[] = [
        { cell: 'Инвойс_заголовок_продавец', value: r.seller.name },
        { cell: 'Инвойс_заголовок_продавец_адрес', value: r.seller.addres },
        { cell: 'Инвойс_дата', value: `DATE: ${getExcelDateStr(r.contractDate, 'en')}` },
        { cell: 'Инвойс_номер', value: `INVOICE NO: ${r.id}` },
        { cell: 'Инвойс_покупатель', value: r.buyer.fullName },
        { cell: 'Инвойс_продавец', value: r.seller.name },
        { cell: 'Инвойс_условия_доставки', value: `${r.terms} ${r.port}`.toUpperCase() },
        { cell: 'Инвойс_всего_места', value: `TOTAL: ${contract.amount.placesTotal.str} kg` },
        { cell: 'Инвойс_всего_цена', value: `${contract.amount.priceTotal.str} $` },
        { cell: 'Инвойс_адреса_продавец', value: r.seller.name },
        { cell: 'Инвойс_адреса_адрес', value: r.seller.addres },
        { cell: 'Инвойс_адреса_счет', value: `A/C NO: ${r.seller.acNo}` },
        { cell: 'Инвойс_адреса_банк', value: `BENEFICIARY BANK ${r.seller.beneficiaryBank}` },
        { cell: 'Инвойс_адреса_банк_адрес', value: `ADDRESS ${r.seller.bankAdress}` },
        { cell: 'Инвойс_адреса_банк_свифт', value: `SWIFT: ${r.seller.swift}` },
        { cell: 'Инвойс_продавец_печать_подвал', value: r.seller.name },
    ];

    cells.forEach((cell) => utils.setCell(cell));

    const rows = Object.values(contract.recordsGroupedBy.bl).reduce<SalesRowT[]>(
        (total, blGroup) => {
            const allRows = blGroup.groupedProductsArr.map((prodGroup) => {
                const cloneGroup = _.cloneDeep(prodGroup);
                cloneGroup.record.amount.placesTotal = cloneGroup.total.placesTotal;
                cloneGroup.record.amount.priceTotal = cloneGroup.total.priceTotal;
                cloneGroup.record.sort = '-';
                return cloneGroup.record;
            });
            total.push(...allRows);
            return total;
        },
        [],
    );

    initSalesTableRows({
        rows,
        isContract: false,
        utils,
    });

    // merge cells
    const startRow = utils.getRow('Инвойс_адреса_продавец', 0).number;
    const endRow = utils.getRow('Инвойс_адреса_банк_свифт', 1).number;
    for (let i = startRow; i < endRow; i += 1) {
        utils.mergeCells({ startCol: 1, endCol: 3, row: i });
    }

    // init pictures
    await initPicturesExcel(
        [
            {
                key: r.seller.code,
                rangeObj: {
                    start: 'Invoice_sign_seller_start',
                    end: 'Invoice_sign_seller_end',
                },
                ws,
            },
        ],
        true,
    );
};
