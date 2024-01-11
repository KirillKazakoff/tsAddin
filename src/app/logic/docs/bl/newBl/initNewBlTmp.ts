import ExcelJS from 'exceljs';
import { ExportRowT } from '../../../../stores/tablesStore/set/setExport';
import { BlGroupT } from '../groupByBl';
import { initExcelUtils } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { CellObjT } from '../../../../types/typesExcelUtils';
import { initNewBlRows } from './initNewBlRows';

export const initNewBlTmp = (book: ExcelJS.Workbook, blGroup: BlGroupT<ExportRowT>) => {
    const ws = book.getWorksheet('BL');
    const utils = initExcelUtils(ws, '');
    const { record: r } = blGroup;

    // prettier-ignore
    const cells: CellObjT[] = [
        { cell: 'BL_No', value: `B/L No. ${r.blNo}` },
        { cell: 'Продавец', value: r.seller.eng.name },
        { cell: 'Продавец_адрес', value: r.seller.eng.address },
        { cell: 'Получатель', value: r.consignee?.fullName || r.agent.name },
        { cell: 'Получатель_адрес', value: r.consignee?.addres || r.agent.address },
        { cell: 'Получатель_уведомление', value: r.consignee?.fullName || r.agent.name },
        { cell: 'Получатель_уведомление_адрес', value: r.consignee?.addres || r.agent.address },
        { cell: 'Судно', value: r.transport.eng.name },
        { cell: 'Куда', value: r.portTo.eng.name },
        { cell: 'Зона_вылова', value: 'OKHOTSK SEA' },
    ];

    initNewBlRows(blGroup, utils);

    cells.forEach((cell) => utils.setCell(cell));
};
