/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';
import {
    InvoicesT,
    VesselGroupT,
    ConsigneeGroupT,
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
        consignees: ConsigneeGroupT;
        vessels: VesselGroupT;
    };
    priceTotal: number;
};

export type AgreementObjT = { [key: string]: AgreementT };
