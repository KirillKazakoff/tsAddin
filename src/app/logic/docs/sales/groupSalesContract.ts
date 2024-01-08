import tablesStore from '../../../stores/tablesStore/tablesStore';
import { groupTotal } from '../../utils/groupify/groupTotal';

export const groupSalesContract = () => {
    const contractsNew = groupTotal({
        rows: tablesStore.salesT,
        input: (row) => ({
            code: row.id,
            groupedBy: {
                bl: { code: row.blNo },
                blProduct: { code: row.blNo + row.product.code + row.pack },
                noGroup: { code: row.blNo + row.product.code + row.pack + row.sort },
            },
        }),
    });

    return contractsNew.slice(-50);
};

export type SalesGroupT = ReturnType<typeof groupSalesContract>[number];
