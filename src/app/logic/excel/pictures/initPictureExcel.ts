import { Worksheet } from 'exceljs';
import pageStatusStore from '../../../stores/pageStatusStore.ts/pageStatusStore';
import picturesStore from '../../../stores/picturesStore/picturesStore';
import { selectPicture } from '../../../stores/picturesStore/selectPicture';
import { initExcelUtils } from '../utils/excelUtilsObj/initExcelUtils';
import { blobFromBase64 } from './blobFromBase64';
import { getPictureRange } from './getPictureRange';
import { loadPicture } from './loadPicture';

export type PictureSettingsT = {
    key: string;
    range: { start: string; end: string };
};

export const initPictureExcel = async (
    ws: Worksheet,
    settings: PictureSettingsT,
) => {
    const { key: keyCode, range: rangeObj } = settings;

    const key = selectPicture(keyCode);
    const blob = blobFromBase64(picturesStore.pictures[key]);

    if (!blob) return;

    const range = getPictureRange(rangeObj, ws);

    await loadPicture({ ws, blob, range });
};

export const initPicturesExcel = async (
    ws: Worksheet,
    settingsArr: PictureSettingsT[],
    isActive: boolean,
) => {
    const utils = initExcelUtils(ws);

    // clear picture fields '-'
    settingsArr.forEach((settings) => {
        utils.getCell(settings.range.start).value = '';
        utils.getCell(settings.range.end).value = '';
    });

    if (!isActive || !picturesStore.isPicturesFound) {
        if (!picturesStore.isPicturesFound) {
            pageStatusStore.setPageStatus('picturesError');
        }
        return;
    }

    const promises = settingsArr.map((settings) => initPictureExcel(ws, settings));
    await Promise.all(promises);
};
