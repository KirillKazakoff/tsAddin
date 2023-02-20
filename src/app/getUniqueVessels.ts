import { TableRowT } from './types/types';

export const getUniqueVessels = (table: TableRowT[]) => {
    const vessels = table.map((row) => row.vessel);
    return Array.from(new Set(vessels));
};
