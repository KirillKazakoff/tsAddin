import { Workbook } from 'exceljs';
import { initExcelUtils } from '../../excel/utils/excelUtilsObj/initExcelUtils';
import { getExcelDateStr } from '../../excel/utils/getExcelDate';
import { initSalesTableRows } from './initSalesTableRows';
import salesContractStore from '../../../stores/docsStores/salesContractStore';
import { SalesGroupT } from './groupSalesContract';

export const initSalesInvoiceTmp = async (book: Workbook, contract: SalesGroupT) => {
    const r = contract.record;
    const ws = book.getWorksheet('Invoice');
    const utils = initExcelUtils(ws, '');

    await utils.initTmp({
        // prettier-ignore
        cells: [
            { name: 'Инвойс_заголовок_продавец', value: r.seller.name },
            { name: 'Инвойс_заголовок_продавец_адрес', value: r.seller.address },
            { name: 'Инвойс_дата', value: `DATE: ${getExcelDateStr(r.contractDate, 'en')}` },
            { name: 'Инвойс_номер', value: `INVOICE NO: ${r.id}` },
            { name: 'Инвойс_покупатель', value: r.buyer.fullName },
            { name: 'Инвойс_продавец', value: r.seller.name },
            { name: 'Инвойс_условия_доставки', value: `${r.terms} ${r.port}`.toUpperCase() },
            { name: 'Инвойс_всего_места', value: `TOTAL: ${contract.total.placesTotal.str} kg` },
            { name: 'Инвойс_всего_цена', value: `${contract.total.priceTotal.str} $` },
            { name: 'Инвойс_адреса_продавец', value: r.seller.name },
            { name: 'Инвойс_адреса_адрес', value: r.seller.address },
            { name: 'Инвойс_адреса_счет', value: `A/C NO: ${r.seller.acNo}` },
            { name: 'Инвойс_адреса_банк', value: `BENEFICIARY BANK ${r.seller.beneficiaryBank}` },
            { name: 'Инвойс_адреса_банк_адрес', value: `ADDRESS ${r.seller.bankAddress}` },
            { name: 'Инвойс_адреса_банк_свифт', value: `SWIFT: ${r.seller.swift}` },
            { name: 'Инвойс_продавец_печать_подвал', value: r.seller.name },
        ],
        initRows: () => {
            initSalesTableRows({
                groups: salesContractStore.fields.isSortGroup
                    ? contract.groupedBy.blProduct
                    : contract.groupedBy.noGroup,
                isContract: false,
                utils,
            });
        },
        mergeCells: [
            {
                row: {
                    from: { name: 'Инвойс_адреса_продавец' },
                    to: { name: 'Инвойс_адреса_банк_свифт' },
                },
                cols: [[1, 3]],
            },
        ],
        pictureSettings: {
            isActive: true,
            settings: [
                {
                    key: r.seller.code,
                    range: {
                        start: 'Invoice_sign_seller_start',
                        end: 'Invoice_sign_seller_end',
                    },
                },
            ],
        },
        printSettings: { endCell: 'Инвойс_продавец_печать_подвал' },
    });
};
