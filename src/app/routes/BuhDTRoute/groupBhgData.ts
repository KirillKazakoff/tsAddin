import { groupTotal } from '../../logic/utils/groupify/groupTotal';
import tablesStore from '../../stores/tablesStore/tablesStore';

export const groupBhgData = () => {
    const res = groupTotal({
        // filter check range empty garbage rows
        rows: tablesStore.customsT.filter((r) => r.blNo),
        input: (r) => {
            return {
                code: r.agreement.idContract,
                isNoAmount: true,
            };
        },
    });

    return res;
};
