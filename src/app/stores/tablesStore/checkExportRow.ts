import {
    checkNotFulfilledRow,
    TableNameT,
} from '../../logic/excel/utils/checkTable';
import { ExportRowT } from '../../types/typesTables';
import { tableError } from '../pageStatusStore.ts/pageMessages';
import pageStatusStore from '../pageStatusStore.ts/pageStatusStore';

export const checkExportRow = (row: ExportRowT, tableName: TableNameT) => {
    Object.entries(row.amount).forEach(([prop, amount]) => {
        if (amount.str === 'не число') {
            pageStatusStore.setPageStatus(
                tableError({ tableName, row: +row.index + 1, prop }),
            );
        }
    });
    checkNotFulfilledRow(row, tableName);
};
