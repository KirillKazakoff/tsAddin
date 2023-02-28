import { setTable } from '../dictionaries/setTable';
import { setTransport } from '../dictionaries/setTransport';
import { setVessels } from '../dictionaries/setVessels';
import { initMate } from './initMate';
import { initTransport } from './initTransport';
import { initVessels } from './initVessels';

export const useInitLetter = () => {
    const initLetter = async () => {
        Excel.run(async (context) => {
            const { worksheets } = context.workbook;
            const { transportCol, mateRange } = initMate(worksheets);
            const spTransportRange = initTransport(worksheets);
            const spVesselsRange = initVessels(worksheets);

            await context.sync();

            setTable(mateRange.values);
            setTransport(transportCol.values, spTransportRange.values);
            setVessels(spVesselsRange.values);
        });
    };
    return initLetter;
};
