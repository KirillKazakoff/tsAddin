import tablesStore from '../../../stores/tablesStore/tablesStore';
import { groupTotal } from '../../utils/groupify/groupTotal';

export const groupMates = () => {
    const grouped = groupTotal({
        rows: tablesStore.matesT.filter(
            (r) => r.operation === 'Внутренний рынок' || r.operation === 'Образец',
        ),
        input: (row) => ({
            code: row.vessel.code + row.product.code + row.sort + row.pack,
        }),
    }).map((group) => ({
        code: group.code,
        kns: group.rows,
    }));

    return grouped;
};
