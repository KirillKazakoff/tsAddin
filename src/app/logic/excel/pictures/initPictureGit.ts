import { Worksheet } from 'exceljs';
import { getPictureRange } from './getPictureRange';
import { loadPicture } from './loadPicture';
import { PictureSettingsT } from './initPictureExcel';
import { getCellSingle } from '../utils/excelUtilsObj/getCell';

export type PictureGitSettingsT = {
    url: string;
    ws: Worksheet;
    rangeObj: PictureSettingsT['range'];
};

export const initPictureGit = async (settings: PictureGitSettingsT) => {
    const { url, ws, rangeObj } = settings;

    const blob = await (await fetch(url)).blob();
    const range = getPictureRange(rangeObj, ws);

    await loadPicture({ blob, ws, range });

    getCellSingle(ws)(rangeObj.start).value = '';
};
