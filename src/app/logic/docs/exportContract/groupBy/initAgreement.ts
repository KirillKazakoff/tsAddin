import type {
    InvoicesT,
    VesselsGroupT,
    ConsigneesGroupT,
    GroupedBlT,
} from '../../../../types/typesContract';
import { ExportRowT } from '../../../../types/typesTables';
import type { COHCT } from '../contractR/setCOHCStatus';

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
            bl: <GroupedBlT<ExportRowT>>{},
        },
        priceTotal: 0,
        cohc: <COHCT>'no',
    };
    return agreement;
};

export type AgreementT = ReturnType<typeof initAgreement>;
export type AgreementsT = { [key: string]: AgreementT };
