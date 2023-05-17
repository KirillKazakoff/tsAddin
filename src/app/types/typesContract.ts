import type { AgreementT } from '../logic/docs/exportContract/groupBy/initAgreement';
import type { BlAmountT } from '../logic/docs/exportContract/groupBy/invoiceAmount';
import { ConsigneeT } from './typesSP';
import { ExportRowT, AmountT } from './typesTables';

// BlT
export type BlGroupT = {
    record: ExportRowT;
    rows: ExportRowT[];
    total: BlAmountT;
};

export type GroupedBlT = {
    [key: string]: BlGroupT;
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
    total: InvoiceAmountT;
};

export type InvoiceT = {
    agreement: AgreementT;
    rows: ExportRowT[];
    invoiceDate: string;
    invoiceNo: string;
    msc: string;
    consignee: ConsigneeT;
    amount: InvoiceAmountT;
    productGroups: { [key: string]: ProductGroupT };
};

export type InvoicesT = {
    [key: string]: InvoiceT;
};

export type ConsigneeGroupT = {
    [key: string]: {
        rows: ExportRowT[];
        consignee: ConsigneeT;
    };
};

type SubjectT = {
    record: ExportRowT;
    total: AmountT;
};

type CostT = {
    record: ExportRowT;
    prices: AmountT[];
};
// VesselGroupT
export type VesselGroupT = {
    all: {
        subject: SubjectT[];
        cost: CostT[];
    };
    byVesselGroup: {
        [key: string]: {
            subject: { [key: string]: SubjectT };
            cost: { [key: string]: CostT };
        };
    };
};
