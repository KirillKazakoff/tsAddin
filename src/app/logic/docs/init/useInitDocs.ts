/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';
import { useEffect } from 'react';
import pageStatusStore from '../../../stores/pageStatusStore.ts/pageStatusStore';
import tablesStore from '../../../stores/tablesStore/tablesStore';
import { ExportRowT } from '../../../types/typesTables';
import { saveFile } from '../../excel/create';
import { useInitExcel } from '../../excel/initExcel';
import { read } from '../readBL';
import { initBlTemplate } from './initBlTemplate';

export const useInitDocs = () => {
    const initExcel = useInitExcel();
    const mode = process.env.NODE_ENV;

    useEffect(() => {
        initExcel();
    }, []);

    const getBl = async (row: ExportRowT) => {
        await initExcel();
        const { isError } = pageStatusStore.status;

        if (isError) return;
        const book = await read();
        const newBook = _.cloneDeep(book);
        initBlTemplate(newBook, row);

        await saveFile(newBook, row.blNo);
    };

    const getAllBl = async () => {
        tablesStore.export.forEach(async (row) => getBl(row));
    };
    // useEffect(() => {
    //     if (mode === 'production') return;

    //     const func = async () => {
    //         await initExcel();
    //         const book = await read();
    //     };

    //     func();
    //     // onClickBl();
    // });

    return { getBl, getAllBl, initExcel };
};
