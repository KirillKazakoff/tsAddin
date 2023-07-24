/* eslint-disable no-param-reassign */
import {
    Alignment, Borders, Font, Row,
} from 'exceljs';

type RowStyleSettingsT = {
    height?: number;
    border?: Partial<Borders>;
    alignment?: Partial<Alignment>;
    font?: Partial<Font>;
};

export const styleRowCells = (row: Row, settings: RowStyleSettingsT) => {
    row.eachCell((cell) => {
        cell.border = settings.border;
        cell.alignment = settings.alignment;
        cell.font = settings.font;
    });

    if (settings.height) {
        row.height = settings.height;
    }
    row.commit();
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

export const fontDefault: Partial<Font> = {
    size: 10,
    bold: false,
};
