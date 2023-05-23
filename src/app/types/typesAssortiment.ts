import { ExportRowT, AmountT } from './typesTables';

export type AssortimentAmountT = {
    places: AmountT;
    placesTotal: AmountT;
};

export type AssortimentTableT = {
    record: ExportRowT;
    rows: ExportRowT[];
    samples: {
        rows: number[];
        total: number;
    };
    amount: AssortimentAmountT;
};

export type AssortimentTablesT = {
    [key: string]: AssortimentTableT;
};

export type AssortimentT = {
    isSample: boolean;
    tables: AssortimentTablesT;
    record: ExportRowT;
};

export type SamplesT = { [key: string]: AssortimentT };
