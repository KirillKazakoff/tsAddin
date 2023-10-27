import { Workbook } from 'exceljs';
import { initExcelUtils } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { NordmileRowT } from '../../../../types/typesTables';
import { CellObjT } from '../../../../types/typesExcelUtils';
import { getExcelDateNumeric } from '../../../excel/utils/getExcelDate';
import { initRequestRowsNordmile } from './initRequestRowsNordmile';

export const initRequestNordmileTmp = (book: Workbook, row: NordmileRowT) => {
    const ws = book.getWorksheet('Request_Contract');

    const utils = initExcelUtils(ws, 0);
    const { priceTotal } = row.amount;

    // prettier-ignore
    const cells: CellObjT[] = [
        { cell: 'Заявка', value: `Прошу разработать договор поставки № ${row.contractNo} от ${getExcelDateNumeric(row.contractDate, 'ru')}` },
        { cell: 'Заявка_дата', value: getExcelDateNumeric(row.contractDate, 'ru') },
        { cell: 'Заявка_стороны', value: `между ${row.seller.ru.name} (ПОСТАВЩИК) и ${row.buyer}` },
        { cell: 'Сумма', value: `Сумма по договору : ${priceTotal.str} Р` },
        { cell: 'Оплата_дата', value: `Порядок расчетов: 100% до ${getExcelDateNumeric(row.paymentDate, 'ru')} путем перечисления на р/с Продавца по счету` },
        { cell: 'Банковские_реквизиты', value: `Указать банковские реквизиты ${row.seller.ru.name} в ${row.bankSeller}____________` },
    ];

    initRequestRowsNordmile([row], utils);

    cells.forEach((cell) => {
        utils.setCell(cell);
    });
};
