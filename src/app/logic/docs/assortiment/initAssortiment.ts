/* eslint-disable no-param-reassign */
import { Worksheet } from 'exceljs';
import { addAssortimentTable } from './addAssortimentTable';
import { AssortimentT } from '../../../types/typesAssortiment';
import exportContractStore from '../../../stores/docsStores/exportContractStore';

export const initAssortiment = async (assortiment: AssortimentT, ws: Worksheet) => {
    // column width setup
    const columns = [1, 2, 3, 4, 5].map((index) => ws.getColumn(index));
    columns[0].width = 15;
    columns[1].width = 25;
    columns[2].width = 15;
    columns[3].width = 20;
    columns[4].width = 20;

    // header style and add
    const { transport, portTo } = assortiment.record;
    const rows = ws.addRows([
        [`Transport vessel ${transport.eng.name.toUpperCase()}`],
        [`ETA ${portTo.eng.name} ${exportContractStore.dischargeDate}`],
        [''],
    ]);

    rows[0].getCell(1).style = {
        font: {
            bold: true,
            size: 14,
            underline: 'single',
        },
    };

    // sort by seller and add tables
    const tables = Object.values(assortiment.tables).sort((a, b) => {
        if (a.record.seller.codeName < b.record.seller.codeName) return -1;
        return 1;
    });

    tables.forEach((table, i) => {
        addAssortimentTable(table, ws, i, assortiment.isSample);
    });
};