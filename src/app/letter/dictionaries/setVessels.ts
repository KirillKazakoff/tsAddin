import letterStore from '../../stores/letterStore';
import { VesselT } from '../../types/typesDictionary';

export const setVessels = (spRange: any[][]) => {
    const { table } = letterStore.letter;
    const vesselsArr = table.map((row) => row.vessel);
    const vesselsMate = Array.from(new Set(vesselsArr));

    const vessels = spRange.filter((row) => {
        return vesselsMate.some((vessel) => vessel === row[0]);
    });

    const transformed: VesselT[] = vessels.map((vessel) => {
        const [name, translation, id] = vessel;
        return { name, translation, id };
    });

    letterStore.setVessels(transformed);
    return transformed;
};
