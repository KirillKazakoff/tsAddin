import { VesselT } from '../../types/typesSP';
import letterStore from './letterStore';

export const setVessels = (spRange: any[][]) => {
    const { table } = letterStore.letter;
    const vesselsArr = table.map((row) => row.vessel);
    const vesselsMate = Array.from(new Set(vesselsArr));

    const vessels = spRange.filter((row) => {
        return vesselsMate.some((vessel) => vessel === row[0]);
    });

    const transformed: VesselT[] = vessels.map((vessel) => {
        const [name, nameEng, id] = vessel;
        return { name, nameEng, id };
    });

    letterStore.setVessels(transformed);
    return transformed;
};
