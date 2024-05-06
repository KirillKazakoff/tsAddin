import { type PrintSettingsT } from './setPrintArea';
import { mergeFromTo } from './mergeCells';
import { PictureSettingsT } from '../../pictures/initPictureExcel';
import type { _CellUtilsT } from './initExcelUtils';

type SettingsT<CellT> = {
    cells?: CellT[];
    initRows?: () => void;
    initTmpCb?: () => Promise<any> | void;
    printSettings?: PrintSettingsT;
    pictureSettings?: {
        settings: PictureSettingsT[];
        isActive: boolean;
    };
    mergeCells?: Parameters<ReturnType<typeof mergeFromTo>>[0];
    pageBreakCellName?: string;
};

// eslint-disable-next-line max-len
export const initTmp = (utils: _CellUtilsT<string>) => async <C>(settings: SettingsT<C>) => {
    if (settings?.cells) {
        settings.cells.forEach((c) => utils.setCell(c as any));
    }

    if (settings?.initTmpCb) {
        await settings.initTmpCb();
    }

    if (settings?.initRows) {
        settings.initRows();
    }

    if (settings?.pictureSettings) {
        await utils.initPictures(
            settings.pictureSettings.settings,
            settings.pictureSettings.isActive,
        );
    }
    if (settings?.mergeCells) {
        utils.mergeFromTo(settings.mergeCells);
    }

    if (settings?.pageBreakCellName) {
        utils.getRow(settings.pageBreakCellName).addPageBreak();
    }
    if (settings?.printSettings) {
        // utils.setPrintArea(settings.printSettings);
    }
};
