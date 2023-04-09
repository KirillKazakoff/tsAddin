/* eslint-disable no-param-reassign */
import { ProductInfoExportT } from '../../../../types/typesContract';
import { ConsigneeT } from '../../../../types/typesSP';

type GroupedProductsT = {
    [key: string]: {
        products: ProductInfoExportT[];
        consignee: ConsigneeT;
    };
};

export const groupByConsignee = (products: ProductInfoExportT[]) => {
    return products.reduce<GroupedProductsT>((total, product) => {
        const { codeName } = product.consignee;
        let group = total[codeName];

        if (!group) {
            group = {
                products: [],
                consignee: product.consignee,
            };
            total[codeName] = group;
        }

        group.products.push(product);
        return total;
    }, {});
};
