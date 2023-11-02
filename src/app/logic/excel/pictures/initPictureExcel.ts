/* eslint-disable max-len */
import { Worksheet } from 'exceljs';
import pageStatusStore from '../../../stores/pageStatusStore.ts/pageStatusStore';
import picturesStore from '../../../stores/picturesStore/picturesStore';
import { selectPicture } from '../../../stores/picturesStore/selectPicture';
import { blobFromBase64 } from './blobFromBase64';
import { getPictureRange } from './getPictureRange';
import { loadPicture } from './loadPicture';
import { getCell } from '../utils/excelUtilsObj/getCell';

export type PictureSettingsT = {
    key: string;
    range: { start: string; end: string };
};

export const initPictureExcel = async (ws: Worksheet, settings: PictureSettingsT) => {
    const { key: keyCode, range: rangeObj } = settings;

    const key = selectPicture(keyCode);
    const blob = blobFromBase64(picturesStore.pictures[key]);

    if (!blob) return;

    const range = getPictureRange(rangeObj, ws);

    await loadPicture({ ws, blob, range });
};

export const initPicturesExcel = (ws: Worksheet) => async (settings: PictureSettingsT[], isActive: boolean) => {
    // clear picture fields '-'
    settings.forEach((setup) => {
        getCell(ws)(setup.range.start).value = '';
        getCell(ws)(setup.range.end).value = '';
    });

    if (!isActive || !picturesStore.isPicturesFound) {
        if (!picturesStore.isPicturesFound) {
            pageStatusStore.setPageStatus('picturesError');
        }
        return;
    }

    const promises = settings.map((setup) => initPictureExcel(ws, setup));
    await Promise.all(promises);
};
