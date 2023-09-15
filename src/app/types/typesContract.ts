import type { AgreementT } from '../logic/docs/exportContract/groupBy/initAgreement';
import type { BlAmountT } from '../stores/tablesStore/utils/specialAmount';
import { ConsigneeT } from './typesSP';
import {
    ExportRowT, AmountT, AmountObjT, CertificateRowT,
} from './typesTables';

// BlT
export type BlGroupT<RowT> = {
    record: RowT;
    rows: RowT[];
    total: BlAmountT;
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

// AgreementR
export type AgreementR = {
    rows: { row: CertificateRowT; exportRow: ExportRowT };
    // blGrouped:
};

export type AgreementsR = {
    [key: string]: AgreementR;
};
