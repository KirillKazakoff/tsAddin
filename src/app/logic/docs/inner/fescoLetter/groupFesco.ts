import tablesStore from '../../../../stores/tablesStore/tablesStore';
import { groupTotal } from '../../../utils/groupify/groupTotal';

export const groupFesco = () => {
    const rows = tablesStore.fescoContainers.map((row) => {
        const mateRow = tablesStore.matesT.find((r) => r.konosament === row.konosament);

        return {
            row,
            mateRow,
            reiceNo: tablesStore.matesT[0].reice,
            type: row.type,
            amount: row.amount,
            id: row.id,
        };
    });

    const groups = groupTotal({
        rows,
        input: ({ row }) => ({
            code: `${row.buyer.code}${row.konosament}`,
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
