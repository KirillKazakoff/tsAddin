import type { AssortimentGroupT } from './group/groupAssortiment';

export const initAssortimentObj = (tables: AssortimentGroupT[], isSample: boolean) => {
    if (tables.length === 0) return null;

    const assortiment = {
        record: tables[0].record,
        tables,
        isSample,
    };
    return assortiment;
};

export type AssortimentObjT = ReturnType<typeof initAssortimentObj>;
export type AssortimentTablesT = AssortimentObjT['tables'];
