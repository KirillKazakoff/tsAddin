import { Workbook } from 'exceljs';
import { SalesContractT } from './groupBy/initSalesContract';
import { initExcelUtils } from '../../excel/utils/excelUtilsObj/initExcelUtils';
import { CellObjT } from '../../../types/typesExcelUtils';
import { getExcelDateStr } from '../../excel/utils/getExcelDate';
import { initPicturesExcel } from '../../excel/pictures/initPictureExcel';

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
        { cell: 'Инвойс_условия_доставки', value: r.terms },
        { cell: 'Инвойс_всего_места', value: `TOTAL: ${r.amount.placesTotal.str}` },
        { cell: 'Инвойс_всего_цена', value: `${r.amount.priceTotal.str} $` },
        { cell: 'Инвойс_адреса_продавец', value: r.seller.name },
        { cell: 'Инвойс_адреса_адрес', value: r.seller.addres },
        { cell: 'Инвойс_адреса_счет', value: `A/C NO: ${r.seller.acNo}` },
        { cell: 'Инвойс_адреса_банк', value: `BENEFICIARY BANK ${r.seller.beneficiaryBank}` },
        { cell: 'Инвойс_адреса_банк_адрес', value: `ADDRESS ${r.seller.bankAdress}` },
        { cell: 'Инвойс_адреса_банк_свифт', value: `SWIFT: ${r.seller.swift}` },
        { cell: 'Инвойс_продавец_печать_подвал', value: r.seller.name },
    ];

    cells.forEach((cell) => utils.setCell(cell));

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
