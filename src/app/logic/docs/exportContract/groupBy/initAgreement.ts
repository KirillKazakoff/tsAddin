import {
    InvoicesT,
    VesselsGroupT,
    ConsigneesGroupT,
} from '../../../../types/typesContract';
import { ExportRowT } from '../../../../types/typesTables';

export const initAgreement = (row: ExportRowT) => {
    const agreement = {
        record: row,
        rows: [],
        productsGroupedBy: {
            invoices: {},
            consignees: {},
            vessels: {
                all: {
                    subject: [],
                    cost: [],
                },
                byVesselGroup: {},
            },
        },
        priceTotal: 0,
    };
    return agreement;
};

export type AgreementT = {
    record: ExportRowT;
    rows: ExportRowT[];
    productsGroupedBy: {
        invoices: InvoicesT;
        consignees: ConsigneesGroupT;
        vessels: VesselsGroupT;
    };
    priceTotal: number;
};

export type AgreementsT = { [key: string]: AgreementT };
