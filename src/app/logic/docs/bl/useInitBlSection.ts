/* eslint-disable import/no-extraneous-dependencies */
import exportContractStore from '../../../stores/docsStores/exportContractStore';
import tablesStore from '../../../stores/tablesStore/tablesStore';
import { ExportRowT } from '../../../types/typesTables';
import { createBL } from './createBl';

export const useInitBlSection = () => {
    const { exportT, exportStorageT } = tablesStore;

    const table: ExportRowT[] = exportContractStore.operation === 'export' ? exportT : exportStorageT;

    const onLoad = async (row: ExportRowT) => createBL(row);

    const onLoadAll = async () => {
        await Promise.all(table.map((row) => onLoad(row)));
    };

    return {
        onLoad,
        onLoadAll,
        table,
    };
};
