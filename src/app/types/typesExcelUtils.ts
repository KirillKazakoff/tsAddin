type Common = {
    cell: string;
    offsetRow?: number;
    numFmt?: string;
    isEmptyTitle?: boolean;
};

export type CellObjDoubleT = Common & {
    eng: string | number;
    ru: string | number;
};

export type CellObjT = Common & {
    value: string | number;
};
