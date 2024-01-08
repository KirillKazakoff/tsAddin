import { Workbook } from 'exceljs';
import { CellUtilsT, initExcelUtils } from './initExcelUtils';
import { PrintSettingsT, setPrintArea } from './setPrintArea';
import { mergeFromTo } from './mergeCells';

type SettingsT<CellT, OffsetCellT extends string> = {
    book: Workbook;
    wsName: string;
    offsetCell: OffsetCellT;
    cells: CellT[];
    cbAfter: (utils: CellUtilsT<OffsetCellT>) => void;
    cbBefore: (utils: CellUtilsT<OffsetCellT>) => void;
    printSettings?: PrintSettingsT;
    mergeSettings?: Parameters<ReturnType<typeof mergeFromTo>>[0];
};

export const initTmp = <C, O extends string>(settings: SettingsT<C, O>) => {
    const ws = settings.book.getWorksheet(settings.wsName);
    const utils = initExcelUtils(ws, settings.offsetCell);

    settings.cells.forEach((c) => utils.setCell(c as any));

    if (settings?.cbBefore) {
        settings.cbBefore(utils);
    }
    if (settings?.cbAfter) {
        settings.cbAfter(utils);
    }
    if (settings?.printSettings) {
        setPrintArea(settings.printSettings);
    }
    if (settings?.mergeSettings) {
        utils.mergeFromTo(settings.mergeSettings);
    }
};
