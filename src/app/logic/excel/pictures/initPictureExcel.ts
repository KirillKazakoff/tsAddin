import { Worksheet } from 'exceljs';
import { noPictureFound } from '../../../stores/pageStatusStore.ts/pageMessages';
import pageStatusStore from '../../../stores/pageStatusStore.ts/pageStatusStore';
import picturesStore from '../../../stores/picturesStore/picturesStore';
import { selectPicture } from '../../../stores/picturesStore/selectPicture';
import { initExcelUtils } from '../utils/excelUtilsObj/initExcelUtils';
import { blobFromBase64 } from './blobFromBase64';
import { getPictureRange } from './getPictureRange';
import { loadPicture } from './loadPicture';

export type PictureSettingsT = {
    key: string;
    ws: Worksheet;
    rangeObj: { start: string; end: string };
};

export const initPictureExcel = async (settings: PictureSettingsT) => {
    const { key: keyCode, ws, rangeObj } = settings;

    const key = selectPicture(keyCode);
    const blob = blobFromBase64(picturesStore.pictures[key]);

    if (!blob) return;

    const range = getPictureRange(rangeObj, ws);

    await loadPicture({ ws, blob, range });
};

export const initPicturesExcel = async (
    settingsArr: PictureSettingsT[],
    isActive: boolean,
) => {
    const { ws } = settingsArr[0];
    const utils = initExcelUtils(ws);

    if (!isActive || !picturesStore.isPicturesFound) {
        // clear picture fields if dont need pictures
        if (!picturesStore.isPicturesFound) {
            pageStatusStore.setPageStatus(noPictureFound());
        }
        return;
    }

    const promises = settingsArr.map((settings) => initPictureExcel(settings));
    await Promise.all(promises);

    settingsArr.forEach((settings) => {
        utils.getCell(settings.rangeObj.start).value = '';
        utils.getCell(settings.rangeObj.end).value = '';
    });
};
