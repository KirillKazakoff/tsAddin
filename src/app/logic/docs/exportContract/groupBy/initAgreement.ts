import type {
    VesselsGroupT,
    ConsigneesGroupT,
} from '../../../../types/typesContract';
import type { ExportRowT } from '../../../../types/typesTables';
import type { BlGroupsT } from './initBlGroup';
import type { InvoicesT } from './initInvoice';
import type { COHCT } from './setCOHCStatus';

export const initAgreement = (row: ExportRowT) => {
    const agreement = {
        record: row,
        rows: <ExportRowT[]>[],
        productsGroupedBy: {
            invoices: <InvoicesT>{},
            consignees: <ConsigneesGroupT>{},
            vessels: <VesselsGroupT>{
                all: {
                    subject: [],
                    cost: [],
                },
                byVesselGroup: {},
            },
            bl: <BlGroupsT<ExportRowT>>{},
        },
        priceTotal: 0,
        cohc: <COHCT>'no',
    };
    return agreement;
};

export type AgreementT = ReturnType<typeof initAgreement>;
export type AgreementsT = { [key: string]: AgreementT };
