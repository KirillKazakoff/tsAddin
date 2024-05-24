import tablesStore from '../../../../stores/tablesStore/tablesStore';
import { groupTotal } from '../../../utils/groupify/groupTotal';

export const groupFesco = () => {
    const groups = groupTotal({
        rows: tablesStore.fescoContainers,
        input: (row) => ({
            code: `${row.buyer.code}`,
            groupedBy: {
                container: {
                    code: `${row.id}`,
                    groupedBy: {
                        productSort: {
                            code: `${row.product.code}${row.sort}`,
                        },
                    },
                },
            },
        }),
    });

    return groups;
};

export type FescoGroupT = ReturnType<typeof groupFesco>[number];
