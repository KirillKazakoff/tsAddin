import { type Worksheet } from 'exceljs';
import { type PictureRangeT } from './getPictureRange';

export type LoadPictureSettingsT = {
    ws: Worksheet;
    blob: Blob;
    range: PictureRangeT;
};

export const loadPicture = async (settings: LoadPictureSettingsT) => {
    const { ws, blob, range } = settings;
    const reader = new FileReader();

    await new Promise((resolve) => {
        reader.onload = async function callback() {
            const imgId = ws.workbook.addImage({
                base64: this.result as string,
                extension: 'png',
            });

            if (!range.ext) {
                ws.addImage(imgId, range.text);
            } else {
                ws.addImage(imgId, {
                    ext: { height: range.ext.height, width: range.ext.width },
                    tl: range.tl,
                });
            }

            resolve(true);
        };

        reader.readAsDataURL(blob);
    });
};
