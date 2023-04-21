import { TransportT, VesselT, ProductionNewT } from './typesSP';
import { MateRowT } from './typesTables';

export type SpsT = {
    transport: TransportT;
    vessels: VesselT[];
    production: ProductionNewT;
};

export type TablesT = {
    mates: MateRowT[];
};

export type LetterT = {
    table: MateRowT[];
    transport: TransportT;
    vessels: VesselT[];
    production: ProductionNewT;
};

export type LetterFieldsT = {
    arrivalVld: string;
    arrivalForeign: string;
    payment: string;
    terms: string;
    ground: string;
    isExport: boolean;
    port: string;
};

// PageStatus
export type PageStatusTypeT =
    | 'notFilledTable'
    | 'sameBl'
    | 'excelInEditingMode'
    | 'transportNotFound'
    | 'ok';

export type PageStatusT = {
    statusType: PageStatusTypeT;
    title: string;
    desc: string;
};
