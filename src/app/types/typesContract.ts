import { InvoiceProductGroupsT } from '../logic/docs/exportContract/groupBy/initInvoice';
import type { AmountT } from '../stores/tablesStore/utils/initAmount';
import { ConsigneeT } from './typesSP';
import { ExportRowT } from './typesTables';

// InvoiceT
export type InvoiceAmountT = {
    placesTotal: AmountT;
    places: AmountT;
    priceTotal: AmountT;
};

export type ConsigneesGroupT = {
    [key: string]: {
        rows: ExportRowT[];
        consignee: ConsigneeT;
        productGroups: InvoiceProductGroupsT;
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
