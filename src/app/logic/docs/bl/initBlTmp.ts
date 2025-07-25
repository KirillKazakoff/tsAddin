import ExcelJS from 'exceljs';
import { ExportRowT } from '../../../stores/tablesStore/set/setExport';
import { BlGroupT } from './groupByBl';
import { initExcelUtils } from '../../excel/utils/excelUtilsObj/initExcelUtils';
import { initBlRows } from './initBlRows';
import blStore from '../../../stores/docsStores/blStore';

export const initBlTmp = (book: ExcelJS.Workbook, blGroup: BlGroupT<ExportRowT>) => {
    const ws = book.getWorksheet('BL');
    const utils = initExcelUtils(ws, '');
    const { record: r } = blGroup;
    const isAgent = r.consignee.code === 'KTI';
    const transport = r.terms !== 'FCA' ? r.transport : r.vessel;

    utils.initTmp({
        // prettier-ignore
        cells: [
            { name: 'BL_No', value: `B/L No. ${r.blNo}` },
            { name: 'Продавец', value: r.seller.eng.name },
            { name: 'Продавец_адрес', value: r.seller.eng.address },
            { name: 'Получатель', value: isAgent ? 'TO ORDER OF SHIPPER' : r.consignee?.fullName },
            { name: 'Получатель_адрес', value: isAgent ? '' : r.consignee?.addres },
            { name: 'Получатель_уведомление', value: r.consignee?.fullName },
            { name: 'Получатель_уведомление_адрес', value: r.consignee?.addres },
            { name: 'Судно', value: transport.eng.name.toUpperCase() },
            { name: 'Куда', value: `${r.portTo.eng.name}, ${r.portTo.eng.country}`.toUpperCase() },
            { name: 'Зона_вылова', value: blStore.fields.catchZone },
            { name: 'Место_дата', value: `${r.portTo.eng.name}, ${r.portTo.eng.country}`.toUpperCase() },
        ],
        initRows: () => initBlRows(blGroup, utils),
        mergeCells: [
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
                cols: [
                    { start: 'At_the_port_merge_start', end: 'At_the_port_merge_end' },
                ],
            },
        ],
    });
};
