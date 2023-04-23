import { useEffect } from 'react';
import { useInitExcel } from '../excel/useInitExcel';
import { getHref } from './getHref';

export const useInitLetter = () => {
    useInitExcel();
    const mode = process.env.NODE_ENV;

    const onLetterSubmit = async () => {
        const href = getHref();
        document.location.href = href;
    };

    useEffect(() => {
        if (mode === 'production') return;
        const func = async () => {
            // const href = getHref();
            // console.log(href);
        };
        func();
    });

    return onLetterSubmit;
};
