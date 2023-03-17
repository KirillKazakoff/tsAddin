import { useEffect } from 'react';
import { useInitExcel } from '../excel/useInitExcel';
import { getHref } from './getHref';

export const useInitLetter = () => {
    const initExcel = useInitExcel();
    const mode = process.env.NODE_ENV;

    const onLetterSubmit = async () => {
        await initExcel();
        const href = getHref();
        document.location.href = href;
    };

    useEffect(() => {
        if (mode === 'production') return;
        const func = async () => {
            await initExcel();
            const href = getHref();
            // console.log(href);
        };
        func();
    });

    return onLetterSubmit;
};
