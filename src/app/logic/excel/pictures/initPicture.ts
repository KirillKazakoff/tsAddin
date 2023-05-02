import { Workbook } from 'exceljs';
import { noPictureFound } from '../../../stores/pageStatusStore.ts/pageMessages';
import pageStatusStore from '../../../stores/pageStatusStore.ts/pageStatusStore';
import picturesStore from '../../../stores/picturesStore/picturesStore';
import { selectPicture } from '../../../stores/picturesStore/selectPicture';
import { initExcelUtils } from '../utils/excelUtilsObj/initExcelUtils';
import { blobFromBase64 } from './blobFromBase64';
import { getPictureRange } from './getPictureRange';

export type PictureSettingsT = {
    key: string;
    book: Workbook;
    rangeObj: { start: string; end: string };
    sheetName: string;
};
export const initPicture = async (settings: PictureSettingsT) => {
    const {
        key: keyCode, book, rangeObj, sheetName,
    } = settings;

    const key = selectPicture(keyCode);
    const blob = blobFromBase64(picturesStore.pictures[key]);
    if (!blob) return;

    const reader = new FileReader();

    const ws = book.getWorksheet(sheetName);
    const range = getPictureRange(rangeObj.start, rangeObj.end, ws);

    await new Promise((resolve) => {
        reader.onload = async function callback() {
            const imgId = book.addImage({
                base64: this.result as string,
                extension: 'png',
            });

            ws.addImage(imgId, range);
            resolve(true);
        };
        reader.readAsDataURL(blob);
    });
};

export const initPictures = async (
    settingsArr: PictureSettingsT[],
    isActive: boolean,
) => {
    if (!isActive || !picturesStore.isPicturesFound) {
        // clear picture fields if dont need pictures
        const ws = settingsArr[0].book.getWorksheet(settingsArr[0].sheetName);
        const utils = initExcelUtils(ws);

        settingsArr.forEach((settings) => {
            utils.getCell(settings.rangeObj.start).value = '';
            utils.getCell(settings.rangeObj.end).value = '';
        });

        if (!picturesStore.isPicturesFound) {
            pageStatusStore.setPageStatus(noPictureFound());
        }
        return;
    }

    const promises = settingsArr.map((settings) => initPicture(settings));
    await Promise.all(promises);
};
