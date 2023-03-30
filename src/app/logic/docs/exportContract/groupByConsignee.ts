/* eslint-disable no-param-reassign */
import { ProductInfoExportT } from '../../../types/typesExportContract';
import { ConsigneeT } from '../../../types/typesSP';

type GroupedProductsT = {
    [key: string]: {
        products: ProductInfoExportT[];
        consignee: ConsigneeT;
    };
};

export const groupByConsignee = (products: ProductInfoExportT[]) => {
    return products.reduce<GroupedProductsT>((total, product) => {
        const { name } = product.consignee;

        if (!total[name]) {
            total[name] = {
                products: [],
                consignee: product.consignee,
            };
        }

        const grouped = total[name].products;
        grouped.push(product);

        return total;
    }, {});
};
