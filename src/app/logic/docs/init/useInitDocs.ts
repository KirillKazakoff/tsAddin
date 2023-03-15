import { useEffect } from 'react';
import { initExcel } from '../../excel/initExcel';
import { createBL } from '../createBL';
import { read } from '../readBL';

export const useInitDocs = () => {
    const mode = process.env.NODE_ENV;

    const onClickBl = async () => {
        await initExcel();
        const book = await read();
        await createBL(book);
    };

    useEffect(() => {
        if (mode === 'production') return;
        onClickBl();
    });

    return onClickBl;
};
