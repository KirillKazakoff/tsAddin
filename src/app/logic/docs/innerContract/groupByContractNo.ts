import tablesStore from '../../../stores/tablesStore/tablesStore';
import { groupTotal } from '../../utils/groupify/groupTotal';

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

    const res = groupTotal({
        rows,
        input: ({ row }) => ({
            code: row.id,
            groupedBy: {
                request: {
                    code:
                        row.product.codeName + row.vessel.codeName + row.sort + row.pack,
                },
            },
        }),
    });

    return res;
};

export type InnerGroupT = ReturnType<typeof groupByContractNo>[number];
export type InnerCombRowT = InnerGroupT['rows'][number];
