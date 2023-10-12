import type { InvoicesT, GroupedBlT } from '../../../../types/typesContract';
import { ExportRowT } from '../../../../types/typesTables';
import type { COHCT } from './setCOHCStatus';

export const initAgreement = (row: ExportRowT) => {
    const agreement = {
        record: row,
        rows: <ExportRowT[]>[],
        productsGroupedBy: {
            invoices: <InvoicesT>{},
            bl: <GroupedBlT<ExportRowT>>{},
        },
        priceTotal: 0,
        cohc: <COHCT>'no',
    };
    return agreement;
};

export type AgreementT = ReturnType<typeof initAgreement>;
export type AgreementsT = { [key: string]: AgreementT };
