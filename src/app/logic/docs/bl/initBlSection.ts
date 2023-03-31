/* eslint-disable import/no-extraneous-dependencies */
import blStore from '../../../stores/docsStores/blStore';
import tablesStore from '../../../stores/tablesStore/tablesStore';
import { ExportCommonRow } from '../../../types/typesTables';
import { createBL } from './createBl';

export const initBlSection = () => {
    const { exportT, exportStorageT } = tablesStore;

    const table: ExportCommonRow[] = blStore.operation === 'export' ? exportT : exportStorageT;

    const getBl = async (row: ExportCommonRow) => {
        await createBL(row);
    };

    const getAllBl = async () => {
        table.forEach(async (row) => getBl(row));
    };

    return { getBl, getAllBl, table };
};
