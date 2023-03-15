import { useEffect } from 'react';
import { setSellers } from '../../stores/spsStore/setSeller';
import { setConsignees } from '../../stores/spsStore/setConsignees';
import { setProduction } from '../../stores/spsStore/setProduction';
import { setVessels } from '../../stores/spsStore/setVessels';
import { setTransport } from '../../stores/spsStore/setTransport';
import { setMate } from '../../stores/tablesStore/setMate';
import {
    initMate,
    initExport,
    initExportStorage,
    initInner,
    initTransport,
    initVessels,
    initSeller,
    initConsignee,
    initProduction,
} from '../../logic/excel/initRanges';
import { setExport } from '../../stores/tablesStore/setExport';

export const useInitDocs = () => {
    const initDocs = async () => {
        try {
            await Excel.run(async (context) => {
                const { worksheets } = context.workbook;

                const mateRange = initMate(worksheets);
                const exportRange = initExport(worksheets);
                const exportStorageRange = initExportStorage(worksheets);
                const innerRange = initInner(worksheets);

                const spTransportRange = initTransport(worksheets);
                const spVesselsRange = initVessels(worksheets);
                const spSellerRange = initSeller(worksheets);
                const spConsigneeRange = initConsignee(worksheets);
                const spProductionRange = initProduction(worksheets);

                await context.sync();

                setMate(mateRange.values);
                setExport(exportRange.values);

                setSellers(spSellerRange.values);
                setTransport(mateRange.values, spTransportRange.values);
                setVessels(spVesselsRange.values);
                setConsignees(spConsigneeRange.values);
                setProduction(spProductionRange.values);
            });
        } catch (e) {
            console.log(e);
        }
    };

    const mode = process.env.NODE_ENV;

    useEffect(() => {
        if (mode === 'production') return;
        const func = async () => {
            await initDocs();
            // const book = await read();
            // createBL(book);
        };
        func();
    });

    return initDocs;
};
