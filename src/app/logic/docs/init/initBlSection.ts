/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';
import blStore from '../../../stores/docsStores/blStore';
import tablesStore from '../../../stores/tablesStore/tablesStore';
import { ExportRowT } from '../../../types/typesTables';
import { createBL } from '../createDoc';

export const initBlSection = () => {
    const { exportT, exportStorageT } = tablesStore;

    const table = blStore.operation === 'export' ? exportT : exportStorageT;

    const getBl = async (row: ExportRowT) => {
        await createBL(row);
    };

    const getAllBl = async () => {
        table.forEach(async (row) => getBl(row));
    };

    return { getBl, getAllBl, table };
};
