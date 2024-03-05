import tablesStore from '../../../stores/tablesStore/tablesStore';
import { groupTotal } from '../../utils/groupify/groupTotal';

export const groupInnerSamples = () => {
    const samples = groupTotal({
        rows: tablesStore.samplesInnerT,
        input: (r) => ({
            code: r.id,
        }),
    });
    return samples.map((sample) => ({ record: { row: sample } }));
};

export type InnerSampleGroupT = ReturnType<typeof groupInnerSamples>[number];
