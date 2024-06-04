import { Cell } from 'exceljs';
import type { RowStyleSettingsT } from './styleRowCells';

export const mergeStyles = (common: RowStyleSettingsT, special: Cell['style']) => {
    const mergedStyles = special || common;
    if (mergedStyles === common) {
        return mergedStyles as Cell['style'];
    }

    Object.keys(common).forEach((key) => {
        if (!common[key] && !special[key]) return;
        mergedStyles[key] = { ...common[key], ...special[key] };
    });

    return mergedStyles as Cell['style'];
};
