/* eslint-disable import/no-extraneous-dependencies */
import exportContractStore from '../../../stores/docsStores/exportContractStore';
import tablesStore from '../../../stores/tablesStore/tablesStore';
import { ExportRowT } from '../../../types/typesTables';
import { createBL } from './createBl';

export const initBlSection = () => {
    const { exportT, exportStorageT } = tablesStore;

    const table: ExportRowT[] = exportContractStore.operation === 'export' ? exportT : exportStorageT;

    const getBl = async (row: ExportRowT) => {
        await createBL(row);
    };

    const getAllBl = async () => {
        table.forEach(async (row) => getBl(row));
    };

    return { getBl, getAllBl, table };
};
