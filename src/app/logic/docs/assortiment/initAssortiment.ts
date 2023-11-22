/* eslint-disable no-param-reassign */
import { Worksheet } from 'exceljs';
import { addAssortimentTable } from './addAssortimentTable';
import exportContractStore from '../../../stores/docsStores/exportContractStore';
import { initRowMaker } from '../../excel/utils/excelUtilsObj/initRows';
import { AssortimentObjT } from './initAssortimentObj';

export const initAssortiment = async (assortiment: AssortimentObjT, ws: Worksheet) => {
    const rowMaker = initRowMaker(ws)();

    // column width setup
    const columns = [1, 2, 3, 4, 5, 6].map((index) => ws.getColumn(index));
    columns[0].width = 15;
    columns[1].width = 25;
    columns[2].width = 15;
    columns[3].width = 20;
    columns[4].width = 20;
    columns[5].width = 15;

    // header style and add
    const { transport, portTo } = assortiment.record;
    const rows = {
        transport: [`Transport vessel ${transport.eng.name.toUpperCase()}`],
        eta: [`ETA ${portTo.eng.name} ${exportContractStore.fields.departureDate}`],
        empty: [''],
    };

    rowMaker.insertRow({
        fields: rows.transport,
        style: {
            common: {
                font: {
                    bold: true,
                    size: 14,
                    underline: 'single',
                },
            },
        },
    });
    rowMaker.insertRows({ records: [rows.eta, rows.empty] });

    // sort by seller and add tables
    const tables = assortiment.tables.sort((a, b) => {
        if (a.record.vessel.eng.name < b.record.vessel.eng.name) return -1;
        return 1;
    });

    tables.forEach((table, i) => {
        addAssortimentTable(table, rowMaker, i, assortiment.isSample);
    });
};
