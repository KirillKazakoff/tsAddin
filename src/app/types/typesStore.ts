import { TableRowT } from './types';
import { TransportT, VesselT, ProductionNewT } from './typesSP';

export type LetterT = {
    table: TableRowT[];
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
