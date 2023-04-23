import type { AgreementT } from '../logic/docs/exportContract/groupBy/initAgreement';
import { ConsigneeT } from './typesSP';
import { AmountT, ExportRowT } from './typesTables';

export type InvoiceT = {
    agreement: AgreementT;
    rows: ExportRowT[];
    invoiceDate: string;
    invoiceNo: string;
    msc: string;
    consignee: ConsigneeT;
    amount: {
        placesTotal: AmountT;
        places: AmountT;
        priceTotal: AmountT;
    };
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
