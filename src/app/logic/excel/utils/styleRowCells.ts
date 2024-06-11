/* eslint-disable no-param-reassign */
import {
    Alignment, Borders, Cell, Fill, Font, Row, Style,
} from 'exceljs';
import { mergeStyles } from './mergeStyles';
import { createFormula } from './createFormula';
import type { SettingsRowT } from './excelUtilsObj/initRows';

export type RowStyleSettingsT = {
    height?: number;
    border?: Partial<Borders> | 'all' | 'outside' | 'edges';
    alignment?: Partial<Alignment> | 'center';
    font?: Partial<Font>;
    fill?: Partial<Fill>;
};

export const myStyles = {
    fill: {
        noFill: <Fill>{
            pattern: 'solid',
            fgColor: { argb: 'FFFFFFFF' },
            bgColor: { argb: 'FFFFFFFF' },
            type: 'pattern',
        },
        fillGray: <Fill>{
            pattern: 'solid',
            fgColor: { argb: 'FFDCDCDC' },
            bgColor: { argb: 'FFDCDCDC' },
            type: 'pattern',
        },
    },
    border: {
        all: <Partial<Borders>>{
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' },
        },
    },
    alignment: {
        center: <Partial<Alignment>>{
            horizontal: 'center',
            wrapText: true,
            vertical: 'middle',
        },
    },
};

export const styleCell = (cell: Cell, settings: Cell['style']) => {
    cell.border = settings.border;
    cell.alignment = settings.alignment;
    cell.font = settings.font;
    if (settings.fill?.type) {
        cell.fill = settings.fill;
    }
};

export const styleRowCommon = (
    row: Row,
    settings: RowStyleSettingsT,
    firstCellCount?: number,
) => {
    const cellSettings: Cell['style'] = {
        border: {},
        alignment: {},
        fill: settings.fill as any,
        font: settings.font,
    };
    // border style
    if (settings.border === 'edges') {
        cellSettings.border = {};
    } else if (settings.border === 'outside') {
        cellSettings.border = { bottom: { style: 'thin' } };
    } else if (settings.border === 'all') {
        cellSettings.border = myStyles.border.all;
    } else {
        cellSettings.border = settings.border;
    }

    if (settings.alignment === 'center') {
        cellSettings.alignment = myStyles.alignment.center;
    } else {
        cellSettings.alignment = settings.alignment;
    }

    row.eachCell((cell) => {
        styleCell(cell, cellSettings);
    });

    if (firstCellCount !== 1) {
        row.getCell(1).border = {};
    }

    if (settings.border === 'outside' || settings.border === 'edges') {
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

    return cellSettings;
};

export const styleRow = <FieldsT>(
    settings: SettingsRowT<FieldsT>,
    row: Row,
    firstCellCount: number,
) => {
    if (settings.style) {
        // prettier-ignore
        let commonStyle: Partial<Style>;
        if (settings.style.common) {
            commonStyle = styleRowCommon(row, settings.style.common, firstCellCount);
        }

        if (settings.style.special) {
            Object.keys(settings.fields).forEach((fieldKey, cellIndex) => {
                const cell = settings.style.special[fieldKey as keyof FieldsT];
                if (!cell) return;

                const cellObj = row.getCell(1 + cellIndex);

                const mergedStyle = mergeStyles(commonStyle, cell.style);

                if (cell.formulaCb) {
                    cellObj.value = createFormula({
                        cell: cellObj,
                        formulaCb: cell.formulaCb,
                        result: settings.fields[fieldKey],
                    });
                }

                styleCell(cellObj, mergedStyle);
            });
        }
    }
};
