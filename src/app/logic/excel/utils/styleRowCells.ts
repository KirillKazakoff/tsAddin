/* eslint-disable no-param-reassign */
import {
    Alignment, Borders, Cell, Font, Row,
} from 'exceljs';
import { mergeStyles } from './mergeStyles';

export type RowStyleSettingsT = {
    height?: number;
    border?: Partial<Borders> | 'all' | 'outside';
    alignment?: Partial<Alignment> | 'center';
    font?: Partial<Font>;
};

export const borderAll: Partial<Borders> = {
    top: { style: 'thin' },
    bottom: { style: 'thin' },
    left: { style: 'thin' },
    right: { style: 'thin' },
};

export const alignmentCenter: Partial<Alignment> = {
    horizontal: 'center',
    wrapText: true,
    vertical: 'middle',
};

export const styleCell = (cell: Cell, settings: Cell['style']) => {
    cell.border = settings.border;
    cell.alignment = settings.alignment;
    cell.font = settings.font;
};

export const styleRowCells = (
    row: Row,
    settings: RowStyleSettingsT,
    firstCellCount?: number,
) => {
    const cellSettings: Cell['style'] = {
        border: {},
        alignment: {},
        font: {},
    };
    if (settings.border === 'outside') {
        cellSettings.border = { bottom: { style: 'thin' } };
    }
    if (settings.border === 'all') {
        cellSettings.border = borderAll;
    }
    if (settings.alignment === 'center') {
        cellSettings.alignment = alignmentCenter;
    }

    row.eachCell((cell) => {
        styleCell(cell, cellSettings);
    });

    if (firstCellCount !== 1) {
        row.getCell(1).border = {};
    }

    if (settings.border === 'outside') {
        row.getCell(firstCellCount).style = mergeStyles(cellSettings, {
            border: { left: { style: 'thin' } },
        });
        row.getCell(row.cellCount).style = mergeStyles(cellSettings, {
            border: { right: { style: 'thin' } },
        });
    }

    if (settings.height) {
        row.height = settings.height;
    }
};

export const fontDefault: Partial<Font> = {
    size: 10,
    bold: false,
};
