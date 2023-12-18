import tablesStore from '../../../stores/tablesStore/tablesStore';
import { groupTotal } from '../../utils/groupify/groupTotal';

export const groupMatesByKns = () => {
    const grouped = groupTotal({
        rows: tablesStore.matesT.filter((r) => r.operation === 'Внутренний рынок'),
        input: (row) => ({
            code: row.vessel.codeName + row.product.codeName + row.sort + row.pack,
        }),
    }).map((group) => ({
        code: group.code,
        kns: group.rows,
    }));

    return grouped;
};
