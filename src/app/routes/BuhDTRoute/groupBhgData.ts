import { groupTotal } from '../../logic/utils/groupify/groupTotal';
import tablesStore from '../../stores/tablesStore/tablesStore';

export const groupBhgData = () => {
    const res = groupTotal({
        rows: tablesStore.customsT,
        input: (r) => {
            return {
                code: r.agreement.agreementNo,
                isNoAmount: true,
            };
        },
    });

    return res;
};
