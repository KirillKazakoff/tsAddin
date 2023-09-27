import { Worksheet } from 'exceljs';

export type LoadPictureSettingsT = {
    ws: Worksheet;
    blob: Blob;
    range: string;
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

            ws.addImage(imgId, range);
            resolve(true);
        };
        reader.readAsDataURL(blob);
    });
};
