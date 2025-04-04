/* eslint-disable no-param-reassign */
import { TableKeyT } from '../../../stores/tablesStore/tablesStore';
import {
    AmountObjT,
    initAmountObj,
    addToAmountObj,
} from '../../../stores/tablesStore/utils/initAmount';
import { Paths } from '../../../types/typesUtils';
import { COHCT } from '../../docs/export/setCOHCStatus';
import { groupify } from './groupify';

type RowExtT = { amount?: AmountObjT; type: TableKeyT };
type AdditionalT = Partial<{
    samples: number;
    cohc: COHCT;
    portLetterNo: string;
    konosamentGroup: { value: string; index: number };
}>;

type P<T> = Paths<T>;

type OutputObjGroupT<R, K> = {
    code: string;
    rows: R[];
    record: R;
    total?: AmountObjT;
    additional: AdditionalT;
    groupedBy?: Record<P<K>, Record<string, OutputObjGroupT<R, K>>>;
    index: number;
};

type OutputGroupT<R, K> = {
    code: string;
    rows: R[];
    record: R;
    total?: AmountObjT;
    additional?: AdditionalT;
    groupedBy?: Record<P<K>, OutputGroupT<R, K>[]>;
    index: number;
};

type AssociativeT<R, K> = Record<string, OutputObjGroupT<R, K>>;

type InputGroupT<R> = {
    code: string;
    groupedBy?: Record<string, InputGroupT<R>>;
    groupModify?: (group: OutputObjGroupT<R, unknown>) => boolean;
    init?: () => boolean;
    additional?: AdditionalT;
    isNoAmount?: boolean;
};

type IExtT<R> = (row: R) => InputGroupT<R>;

const arrayifyRecursive = <R, K>(group: OutputObjGroupT<R, K>) => {
    Object.keys(group.groupedBy).forEach((key) => {
        const associative = group.groupedBy[key];
        const associativeArray = Object.values(associative) as any;

        group.groupedBy[key] = associativeArray;

        if (associativeArray[0]?.groupedBy) {
            associativeArray.forEach((subGroup) => {
                arrayifyRecursive(subGroup);
            });
        }
    });
};

const arrayify = <R, K>(total: AssociativeT<R, K>): OutputGroupT<R, K>[] => {
    const groupArray = Object.values(total).map((group) => {
        arrayifyRecursive(group);
        return group;
    });

    return groupArray as any;
};

const groupifyOutput = <R extends RowExtT, K>(
    input: InputGroupT<R>,
    associative: AssociativeT<R, K>,
    row: R,
) => {
    const init = {
        code: input.code,
        rows: [],
        record: row,
        groupedBy: {} as Record<P<K>, Record<string, OutputObjGroupT<R, K>>>,
        total: initAmountObj(row.type),
        additional: input.additional,
        index: 0,
    };

    const group = groupify(associative, init, input.code);

    if (!input.isNoAmount) {
        addToAmountObj(group.total, row.amount);
    }

    group.rows.push(row);

    return group;
};

const groupRecursive = <R extends RowExtT, K>(
    input: InputGroupT<R>,
    output: AssociativeT<R, K>,
    row: R,
) => {
    if (input?.init) {
        if (!input.init()) return;
    }

    const group = groupifyOutput(input, output, row);

    if (input?.groupModify) {
        const goNext = input?.groupModify(group);
        if (!goNext) return;
    }

    const groupedBy = input?.groupedBy;
    if (!groupedBy) return;

    Object.entries(input.groupedBy).forEach(([key, subInput]) => {
        const subOutput = groupify(output[group.code].groupedBy, {}, key);
        groupRecursive(subInput as InputGroupT<R>, subOutput, row);
    });

    group.index = Object.values(output).findIndex((g) => g.code === group.code) + 1;
};

export const groupTotal = <R extends RowExtT, I extends IExtT<R>>(settings: {
    rows: R[];
    input: I;
}) => {
    type K = ReturnType<I>['groupedBy'];
    const { rows, input: getInput } = settings;
    const output: AssociativeT<R, K> = {};

    rows.forEach((row) => {
        const input = getInput(row);
        groupRecursive(input as any, output, row);
    });

    Object.values(output).forEach((g, i) => {
        g.index = i + 1;
    });

    return arrayify(output) as unknown as OutputGroupT<R, K>[];
};
