import type { AgreementT } from '../logic/docs/exportContract/groupBy/initAgreement';
import type { AmountObjT, AmountT } from '../stores/tablesStore/utils/initAmount';
import { ConsigneeT } from './typesSP';
import { ExportRowT } from './typesTables';

// BlT
export type BlProductGroupedT<RowT> = {
    record: RowT;
    total: AmountObjT;
    rows: RowT[];
};

export type BlGroupT<RowT> = {
    record: RowT;
    groupedBy: {
        product: { [key: string]: BlProductGroupedT<RowT> };
    };
    groupedProductsArr: BlProductGroupedT<RowT>[];
    total: AmountObjT;
};

export type GroupedBlT<RowT> = {
    [key: string]: BlGroupT<RowT>;
};

// InvoiceT
export type InvoiceAmountT = {
    placesTotal: AmountT;
    places: AmountT;
    priceTotal: AmountT;
};

export type ProductGroupT = {
    rows: ExportRowT[];
    record: ExportRowT;
    total: AmountObjT;
};

export type ProductGroupsT = {
    [key: string]: ProductGroupT;
};

export type InvoiceT = {
    agreement: AgreementT;
    rows: ExportRowT[];
    invoiceDate: string;
    invoiceNo: string;
    msc: string;
    consignee: ConsigneeT;
    amount: AmountObjT;
    productGroups: ProductGroupsT;
};

export type InvoicesT = {
    [key: string]: InvoiceT;
};

export type ConsigneesGroupT = {
    [key: string]: {
        rows: ExportRowT[];
        consignee: ConsigneeT;
        productGroups: ProductGroupsT;
    };
};

export type SubjectT = {
    record: ExportRowT;
    total: AmountT;
};

export type CostT = {
    record: ExportRowT;
    prices: AmountT[];
};

// VesselGroupT
export type VesselGroupT = {
    subject: { [key: string]: SubjectT };
    cost: { [key: string]: CostT };
};

export type VesselsGroupT = {
    all: {
        subject: SubjectT[];
        cost: CostT[];
    };
    byVesselGroup: {
        [key: string]: VesselGroupT;
    };
};
