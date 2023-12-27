import { ProductionT } from '../../../stores/spsStore/set/setProduction';
import { ProductionSalesT } from '../../../stores/spsStore/set/setProductionSales';
import { TableKeyT } from '../../../stores/tablesStore/tablesStore';
import { AmountObjT } from '../../../stores/tablesStore/utils/initAmount';
import { groupTotal } from '../../utils/groupify/groupTotal';

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
                    code: `${row.product.code}${row.pack}`,
                },
                productSort: {
                    code: `${row.product.code}${row.sort}`,
                },
            },
        }),
    });

    return bl;
};

export type BlGroupT<RowT extends RowBlExtendT> = ReturnType<
    typeof groupByBl<RowT>
>[number];
