import tablesStore from '../../../../stores/tablesStore/tablesStore';
import { groupTotal } from '../../../utils/groupify/groupTotal';

export const groupSalesContract = () => {
    const contractsNew = groupTotal({
        rows: tablesStore.sales,
        input: (row) => ({
            code: row.id,
            groupedBy: {
                bl: { code: row.blNo },
                blProduct: { code: row.product.codeName + row.pack },
                noGroup: { code: row.product.codeName + row.pack + row.sort },
            },
        }),
    });

    return contractsNew.slice(-5);
};

export type SalesGroupT = ReturnType<typeof groupSalesContract>[number];
