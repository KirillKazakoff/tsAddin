import ExcelJS from 'exceljs';
import { CellObjT } from '../../../types/typesExcelUtils';
import { initExcelUtils } from '../../excel/utils/excelUtilsObj/initExcelUtils';
import { getExcelDateStr } from '../../excel/utils/getExcelDate';
import { initBlRows } from './initBlRows';
import { BlGroupT } from '../../../types/typesContract';
import { ExportRowT } from '../../../types/typesTables';

export const initBlTmp = (book: ExcelJS.Workbook, blGroup: BlGroupT<ExportRowT>) => {
    const ws = book.getWorksheet('BL');
    const utils = initExcelUtils(ws);
    const { record } = blGroup;

    // prettier-ignore
    const cells: CellObjT[] = [
        { cell: 'Продавец', value: record.seller.eng.name },
        { cell: 'Продавец_адрес', value: record.seller.eng.addres },
        { cell: 'Получатель', value: record.consignee?.fullName || record.agent.name },
        { cell: 'Получатель_адрес', value: record.consignee?.addres || record.agent.addres },
        { cell: 'Дата', value: getExcelDateStr(record.date, 'eng') },
        { cell: 'Судно', value: record.vessel.eng.name },
        { cell: 'Транспорт', value: record.transport.eng.name },
        { cell: 'Куда', value: record.portTo.eng.name },
        { cell: 'Откуда', value: record.portFrom.eng.name },
    ];

    initBlRows(blGroup, utils);

    cells.forEach((cell) => utils.setCell(cell));
};
