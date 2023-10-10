import { Cell } from 'exceljs';
import type { RowStyleSettingsT } from './styleRowCells';

export const mergeStyles = (common: RowStyleSettingsT, special: Cell['style']) => {
    const mergedStyles = special;

    Object.keys(common).forEach((key) => {
        mergedStyles[key] = { ...common[key], ...special[key] };
    });

    return mergedStyles;
};
