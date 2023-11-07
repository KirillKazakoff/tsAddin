import { initAmountObj } from '../../../../stores/tablesStore/utils/initAmount';
import { CommonRowT } from '../../../../types/typesTables';

export const initProductGroup = <RowT extends CommonRowT>(row: RowT) => {
    return {
        record: row,
        total: initAmountObj(row.type),
        rows: <RowT[]>[],
    };
};

export type ProductGroupT<RowT extends CommonRowT> = ReturnType<
    typeof initProductGroup<RowT>
>;

export const initBlGroup = <RowT extends CommonRowT>(row: RowT) => {
    // prettier-ignore
    return {
        record: row,
        groupedBy: {
            product: <{ [key: string]: ProductGroupT<RowT> }>{},
            productSort: <{ [key: string]: ProductGroupT<RowT> }>{},
        },
        separatedBy: {
            pack: <{ [key: string]: ProductGroupT<RowT> }>{},
        },

        groupedProductsArr: <ProductGroupT<RowT>[]>[],
        groupedProductsSortArr: <ProductGroupT<RowT>[]>[],
        separatedByPack: <ProductGroupT<RowT>[]>[],

        total: initAmountObj(row.type),
    };
};

export type BlGroupT<RowT extends CommonRowT> = ReturnType<typeof initBlGroup<RowT>>;
export type BlGroupsT<RowT extends CommonRowT> = { [key: string]: BlGroupT<RowT> };
