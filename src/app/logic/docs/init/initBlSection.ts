/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';
import tablesStore from '../../../stores/tablesStore/tablesStore';
import { ExportRowT } from '../../../types/typesTables';
import { createBL } from '../createBL';

export const initBlSection = () => {
    const getBl = async (row: ExportRowT) => {
        await createBL(row);
    };

    const getAllBl = async () => {
        tablesStore.exportT.forEach(async (row) => getBl(row));
    };

    return { getBl, getAllBl };
};
