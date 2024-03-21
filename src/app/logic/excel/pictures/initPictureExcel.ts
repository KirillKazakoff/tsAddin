/* eslint-disable max-len */
import { Worksheet } from 'exceljs';
import picturesStore from '../../../stores/picturesStore/picturesStore';
import { selectPicture } from '../../../stores/picturesStore/selectPicture';
import { blobFromBase64 } from './blobFromBase64';
import { getPictureRange } from './getPictureRange';
import { loadPicture } from './loadPicture';
import { getCell } from '../utils/excelUtilsObj/getCell';
import popupStore from '../../../stores/popupStore.ts/popupStore';

export type PictureSettingsT = {
    key: string;
    range: { start: string; end?: string; ext?: { width: number; height: number } };
};

export const initPictureExcel = async (ws: Worksheet, settings: PictureSettingsT) => {
    const { key: keyCode, range: rangeObj } = settings;

    const key = selectPicture(keyCode);
    if (!key) {
        popupStore.pushStatus({
            title: 'Отсутствует изображение для указанного ключа:',
            desc: `${keyCode} изображение отсутствует в программе`,
        });
        return;
    }

    const blob = blobFromBase64(picturesStore.pictures[key]);
    if (!blob || blob.size === 0) {
        popupStore.pushStatus({
            title: 'Отсутствует изображение:',
            desc: `${keyCode} изображение отсутствует в справочнике Картинки`,
        });
        return;
    }

    const range = getPictureRange(rangeObj, ws);

    await loadPicture({ ws, blob, range });
};

export const initPicturesExcel = (ws: Worksheet) => async (settings: PictureSettingsT[], isActive: boolean) => {
    // clear picture fields '-'
    settings.forEach((setup) => {
        getCell(ws)(setup.range.start).value = '';
        getCell(ws)(setup.range.end).value = '';
    });

    if (!isActive || !picturesStore.isPicturesFound) return;

    const promises = settings.map((setup) => initPictureExcel(ws, setup));
    await Promise.all(promises);
};
