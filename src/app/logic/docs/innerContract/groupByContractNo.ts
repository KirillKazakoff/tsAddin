import tablesStore from '../../../stores/tablesStore/tablesStore';
import { groupTotal } from '../../utils/groupTotal';

export const groupByContractNo = () => {
    const rows = tablesStore.innerT.map((row) => {
        const mateRow = tablesStore.matesT.find((r) => r.konosament === row.konosament);
        return {
            row,
            mateRow,
            type: row.type,
            amount: row.amount,
            id: row.id,
        };
    });

    return groupTotal({
        rows,
        input: ({ row }) => ({
            code: row.id,
            groupedBy: {
                request: { code: row.product.codeName + row.sort + row.pack },
            },
        }),
    });
};

export type InnerGroupT = ReturnType<typeof groupByContractNo>[number];
export type InnerCombRowT = InnerGroupT['rows'][number];
