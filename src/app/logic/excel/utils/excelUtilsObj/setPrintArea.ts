/* eslint-disable no-param-reassign */
import { CellUtilsT } from './initExcelUtils';

type PrintSettingsT = {
    endCell: string;
    offset?: number;
    utils: CellUtilsT<''> | CellUtilsT<string>;
};

export const setPrintArea = (settings: PrintSettingsT) => {
    const { utils, offset, endCell } = settings;
    const { cellCount, number } = utils.getRow(endCell, offset || 0);
    const column = utils.ws.getColumn(cellCount).letter;

    utils.ws.pageSetup.printArea = `A1:${column}${number + 1}`;
};
