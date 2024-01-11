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
        { cell: 'Судно', value: r.transport.eng.name.toUpperCase() },
        { cell: 'Куда', value: `${r.portTo.eng.name}, ${r.portTo.eng.country}`.toUpperCase() },
        { cell: 'Зона_вылова', value: 'OKHOTSK SEA' },
        { cell: 'Место_дата', value: `${r.portTo.eng.name}, ${r.portTo.eng.country}`.toUpperCase() },
    ];

    initNewBlRows(blGroup, utils);

    utils.mergeFromTo([
        {
            row: {
                from: { name: 'Shipped_merge_start' },
                to: { name: 'Shipped_merge_end' },
                oneRow: true,
            },
            cols: [{ start: 'Shipped_merge_start', end: 'Shipped_merge_end' }],
        },
        {
            row: {
                from: { name: 'At_the_port_merge_start' },
                to: { name: 'At_the_port_merge_end' },
                oneRow: true,
            },
            cols: [{ start: 'At_the_port_merge_start', end: 'At_the_port_merge_end' }],
        },
    ]);

    cells.forEach((cell) => utils.setCell(cell));
};
