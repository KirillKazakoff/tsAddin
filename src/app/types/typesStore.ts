import { TableRowT } from './types';
import { TransportT, VesselT, ProductionNewT } from './typesSP';

export type LetterT = {
    table: TableRowT[];
    transport: TransportT;
    vessels: VesselT[];
    production: ProductionNewT;
};

export type LetterFieldsT = {
    dateArrival: string;
    datePayment: string;
    terms: string;
    ground: string;
    operation: string;
    port: string;
};
