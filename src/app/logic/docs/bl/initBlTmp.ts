import ExcelJS from 'exceljs';
import { CellObjT } from '../../../types/typesExcelUtils';
import { initExcelUtils } from '../../excel/utils/excelUtilsObj/initExcelUtils';
import { getExcelDateStr } from '../../excel/utils/getExcelDate';
import { initBlRows } from './initBlRows';
import { BlGroupT } from './groupByBl';
import { ExportRowT } from '../../../stores/tablesStore/set/setExport';

export const initBlTmp = (book: ExcelJS.Workbook, blGroup: BlGroupT<ExportRowT>) => {
    const ws = book.getWorksheet('BL');
    const utils = initExcelUtils(ws, '');
    const { record: r } = blGroup;

    // prettier-ignore
    const cells: CellObjT[] = [
        { cell: 'Продавец', value: r.seller.eng.name },
        { cell: 'Продавец_адрес', value: r.seller.eng.address },
        { cell: 'Получатель', value: r.consignee?.fullName || r.agent.name },
        { cell: 'Получатель_адрес', value: r.consignee?.addres || r.agent.address },
        { cell: 'Дата', value: getExcelDateStr(r.date, 'eng') },
        { cell: 'Судно', value: r.vessel.eng.name },
        { cell: 'Транспорт', value: r.transport.eng.name },
        { cell: 'Куда', value: r.portTo.eng.name },
        { cell: 'Откуда', value: r.portFrom.eng.name },
    ];

    initBlRows(blGroup, utils);

    cells.forEach((cell) => utils.setCell(cell));
};
