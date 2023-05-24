import { useEffect } from 'react';
import excelSyncStore from '../../stores/excelSyncStore.ts/excelSyncStore';

import { getHref } from './getHref';
import { tryCatch } from '../excel/utils/tryCatch';

export const initLetter = () => {
    const onLetterSubmit = async () => {
        const href = getHref();
        document.location.href = href;
        // refresh stores
        excelSyncStore.setSync(false);
    };

    return onLetterSubmit;
};

export const useInitLetter = () => {
    const mode = process.env.NODE_ENV;
    useEffect(() => {
        if (mode === 'production') return;
        const func = async () => {
            // const href = getHref();
            // console.log(href);
        };
        func();
    });

    return tryCatch<typeof initLetter>(initLetter);
};
