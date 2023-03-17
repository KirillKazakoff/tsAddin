/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';
import { useEffect } from 'react';
import excelChangesStore from '../../../stores/excelSyncStore.ts/excelSyncStore';
import pageStatusStore from '../../../stores/pageStatusStore.ts/pageStatusStore';
import tablesStore from '../../../stores/tablesStore/tablesStore';
import { ExportRowT } from '../../../types/typesTables';
import { saveFile } from '../../excel/create';
import { useInitExcel } from '../../excel/useInitExcel';
import { read } from '../readBL';
import { initBlTemplate } from './initBlTemplate';

export const useInitDocs = () => {
    const initExcel = useInitExcel();
    const { statusType } = pageStatusStore.status;
    const { isSync } = excelChangesStore;

    useEffect(() => {
        if (statusType === 'ok' || !isSync) {
            initExcel();
        }
    }, [statusType, isSync]);

    const getBl = async (row: ExportRowT) => {
        await initExcel();

        if (statusType !== 'ok') return;
        const book = await read();
        const newBook = _.cloneDeep(book);
        initBlTemplate(newBook, row);

        await saveFile(newBook, row.blNo);
    };

    const getAllBl = async () => {
        tablesStore.export.forEach(async (row) => getBl(row));
    };

    return { getBl, getAllBl, initExcel };
};
