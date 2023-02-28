import letterStore from '../../stores/letterStore';
import { setProduction } from '../../stores/setProduction';
import { setTable } from '../../stores/setTable';
import { setTransport } from '../../stores/setTransport';
import { setVessels } from '../../stores/setVessels';

import { initMate } from './initMate';
import { initProduction } from './initProducts';
import { initTransport } from './initTransport';
import { initVessels } from './initVessels';

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

            console.log({ ...letterStore.letter.production });
        });
    };
    return initLetter;
};
