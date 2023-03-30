import { ProductDescriptionT, ConsigneeT } from './typesSP';

export type ProductInfoExportT = {
    product: ProductDescriptionT;
    price: number;
    isPriceUnique: boolean;
    consignee: ConsigneeT;
    amount: number;
};
