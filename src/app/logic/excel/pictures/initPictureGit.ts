import { Worksheet } from 'exceljs';
import { PictureRangeObjT, getPictureRange } from './getPictureRange';
import { loadPicture } from './loadPicture';

export type PictureGitSettingsT = {
    url: string;
    ws: Worksheet;
    rangeObj: PictureRangeObjT;
};

export const initPictureGit = async (settings: PictureGitSettingsT) => {
    const { url, ws, rangeObj } = settings;

    const blob = await (await fetch(url)).blob();
    const range = getPictureRange(rangeObj, ws);

    await loadPicture({ blob, ws, range });
};
