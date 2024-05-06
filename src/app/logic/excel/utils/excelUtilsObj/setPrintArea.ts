/* eslint-disable no-param-reassign */
import type { _CellUtilsT } from './initExcelUtils';

export type PrintSettingsT = {
    endCell: string;
    offset?: number;
};

export const setPrintArea = (utils: _CellUtilsT<string>) => (settings: PrintSettingsT) => {
    const { offset, endCell } = settings;
    const { cellCount, number } = utils.getRow(endCell, offset || 0);
    const column = utils.ws.getColumn(cellCount).letter;

    utils.ws.pageSetup.printArea = `A1:${column}${number + 1}`;
};
