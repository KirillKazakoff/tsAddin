import { TableKeyT } from '../../../../stores/tablesStore/tablesStore';
import { AmountObjT } from '../../../../stores/tablesStore/utils/initAmount';
import { ProductionT, ProductionSalesT } from '../../../../types/typesSP';
import { groupTotal } from '../../../utils/groupTotal';

type RowBlExtendT = {
    blNo: string;
    amount: AmountObjT;
    pack: number;
    product: ProductionT | ProductionSalesT;
    sort: string;
    type: TableKeyT;
};

export const groupByBl = <RowT extends RowBlExtendT>(rows: RowT[]) => {
    const bl = groupTotal({
        rows,
        input: (row) => ({
            code: row.blNo,
            groupedBy: {
                product: {
                    code: `${row.product.codeName}${row.pack}`,
                },
                productSort: {
                    code: `${row.product.codeName}${row.sort}`,
                },
            },
        }),
    });

    return bl;
};

export type BlGroupT<RowT extends RowBlExtendT> = ReturnType<
    typeof groupByBl<RowT>
>[number];
