/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';
import pageStatusStore from '../../../stores/pageStatusStore.ts/pageStatusStore';
import tablesStore from '../../../stores/tablesStore/tablesStore';
import { ExportRowT } from '../../../types/typesTables';
import { useInitExcel } from '../../excel/useInitExcel';
import { createBL } from '../createBL';

export const useInitDocs = () => {
    const initExcel = useInitExcel();
    const { statusType } = pageStatusStore.status;

    const getBl = async (row: ExportRowT) => {
        if (statusType !== 'ok') return;
        await createBL(row);
    };

    const getAllBl = async () => {
        tablesStore.export.forEach(async (row) => getBl(row));
    };

    return { getBl, getAllBl, initExcel };
};
