import { useEffect } from 'react';
import {
    initMate, initProduction, initTransport, initVessels,
} from '../initExcel';
import { setProduction } from '../stores/spsStore/setProduction';
import { setTransport } from '../stores/spsStore/setTransport';
import { setVessels } from '../stores/spsStore/setVessels';
import { setMate } from '../stores/tablesStore/setMate';
import { getHref } from './getHref';

export const useInitLetter = () => {
    const initLetter = async () => {
        try {
            await Excel.run(async (context) => {
                const { worksheets } = context.workbook;
                const mateRange = initMate(worksheets);
                const spTransportRange = initTransport(worksheets);
                const spVesselsRange = initVessels(worksheets);
                const spProductionRange = initProduction(worksheets);

                await context.sync();

                setMate(mateRange.values);
                setTransport(mateRange.values, spTransportRange.values);
                setVessels(spVesselsRange.values);
                setProduction(spProductionRange.values);
            });
        } catch (e) {
            console.log(e);
        }
    };

    // debuging mode not to click every time
    const mode = process.env.NODE_ENV;

    useEffect(() => {
        if (mode === 'production') return;
        const func = async () => {
            await initLetter();
            // const href = getHref();
            // console.log(href);
        };
        func();
    });

    return initLetter;
};
