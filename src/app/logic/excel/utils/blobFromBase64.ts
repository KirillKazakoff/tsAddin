import { Workbook } from 'exceljs';
import { unknownError } from '../../../stores/pageStatusStore.ts/pageMessages';
import pageStatusStore from '../../../stores/pageStatusStore.ts/pageStatusStore';
import picturesStore, {
    PictureKey,
} from '../../../stores/picturesStore/picturesStore';

export const blobFromBase64 = (base64String) => {
    try {
        const byteArray = Uint8Array.from(
            window
                .atob(base64String)
                .split('')
                .map((char) => char.charCodeAt(0)),
        );
        return new Blob([byteArray]);
    } catch (e) {
        pageStatusStore.setPageStatus(unknownError(e.message));
        return false;
    }
};

export type PictureSettingsT = {
    key: PictureKey;
    book: Workbook;
    range: string;
    sheetName: string;
};
export const initPicture = async (settings: PictureSettingsT) => {
    const {
        key, book, range, sheetName,
    } = settings;

    const blob = blobFromBase64(picturesStore.pictures[key]);
    if (!blob) return;
    const reader = new FileReader();

    await new Promise((resolve) => {
        reader.onload = async function callback() {
            const imgId = book.addImage({
                base64: this.result as string,
                extension: 'png',
            });

            const ws = book.getWorksheet(sheetName);
            ws.addImage(imgId, range);
            resolve(true);
        };
        reader.readAsDataURL(blob);
    });
};
