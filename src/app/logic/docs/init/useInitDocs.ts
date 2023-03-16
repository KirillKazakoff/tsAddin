import { useEffect } from 'react';
import pageStatusStore from '../../../stores/pageStatusStore.ts/pageStatusStore';
import { useInitExcel } from '../../excel/initExcel';
import { createBL } from '../createBL';
import { read } from '../readBL';

export const useInitDocs = () => {
    const initExcel = useInitExcel();
    const mode = process.env.NODE_ENV;

    const onClickBl = async () => {
        await initExcel();
        const { isError } = pageStatusStore.status;

        if (isError) return;
        const book = await read();
        await createBL(book);
    };

    useEffect(() => {
        if (mode === 'production') return;
        console.log('he');

        const func = async () => {
            await initExcel();
            const book = await read();
        };

        func();
        // onClickBl();
    });

    return onClickBl;
};
