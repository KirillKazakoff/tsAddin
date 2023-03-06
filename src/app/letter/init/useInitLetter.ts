import { setProduction } from '../../stores/letterStore/setProduction';
import { setTable } from '../../stores/letterStore/setTable';
import { setTransport } from '../../stores/letterStore/setTransport';
import { setVessels } from '../../stores/letterStore/setVessels';

import { initMate } from './initMate';
import { initProduction } from './initProducts';
import { initTransport } from './initTransport';
import { initVessels } from './initVessels';

export const useInitLetter = () => {
    const initLetter = async () => {
        try {
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
        } catch (e) {
            console.log(e.message);
        }
    };
    return initLetter;
};
