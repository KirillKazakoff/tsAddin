import { useEffect } from 'react';
import { setProduction } from '../../stores/letterStore/setProduction';
import { setTable } from '../../stores/letterStore/setTable';
import { setTransport } from '../../stores/letterStore/setTransport';
import { setVessels } from '../../stores/letterStore/setVessels';
import { getHref } from '../getHref';
import {
    initMate,
    initProduction,
    initTransport,
    initVessels,
} from './initExcelLetter';

export const useInitLetter = () => {
    const initLetter = async () => {
        await Excel.run(async (context) => {
            const { worksheets } = context.workbook;
            const { transportCol, mateRange } = initMate(worksheets);
            const spTransportRange = initTransport(worksheets);
            const spVesselsRange = initVessels(worksheets);
            const spProductionRange = initProduction(worksheets);

            await context.sync();

            setTable(mateRange.values);
            setTransport(transportCol.values, spTransportRange.values);
            setVessels(spVesselsRange.values);
            setProduction(spProductionRange.values);
        });
    };

    // debuging mode not to click every time
    const mode = process.env.NODE_ENV;

    useEffect(() => {
        if (mode === 'production') return;
        const func = async () => {
            await initLetter();
            getHref();
        };
        func();
    });

    return initLetter;
};
