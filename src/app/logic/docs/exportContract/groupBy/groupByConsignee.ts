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
        const { name } = product.consignee;
        let group = total[name];

        if (!group) {
            group = {
                products: [],
                consignee: product.consignee,
            };
            total[name] = group;
        }

        group.products.push(product);
        return total;
    }, {});
};
