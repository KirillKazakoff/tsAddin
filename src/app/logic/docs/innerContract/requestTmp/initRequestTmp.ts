import { Workbook } from 'exceljs';
import { initExcelUtils } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { getExcelDateNumeric } from '../../../excel/utils/getExcelDate';
import { ContractT } from '../groupByContractNo';
import { initRequestRows } from './initRequestRows';

export const initRequestTmp = (book: Workbook, contract: ContractT) => {
    const ws = book.getWorksheet('Request_Contract');
    const utils = initExcelUtils(ws);
    const { setCell } = utils;

    const { record, priceTotal, rows } = contract;

    setCell({
        cell: 'Заявка',
        value: `Прошу разработать договор поставки № ${record.contractNo} от ${record.contractDate}`,
    });
    setCell({
        cell: 'Заявка_дата',
        value: getExcelDateNumeric(record.contractDate, 'ru'),
    });
    setCell({
        cell: 'Заявка_стороны',
        value: `между ${record.seller.ru.name} (ПОСТАВЩИК) и ${record.buyer.name}`,
    });

    initRequestRows(rows, utils);

    setCell({
        cell: 'Сумма',
        value: `Сумма по договору : ${priceTotal.str} Р`,
    });
};
