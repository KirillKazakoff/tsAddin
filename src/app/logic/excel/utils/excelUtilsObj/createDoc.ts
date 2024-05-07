import ExcelJS from 'exceljs';
import { readTmp } from '../../../docs/readTmp';
import { pathObj } from '../../../utils/constants';
import { saveFile } from '../saveFile';

export type CreateDocSettingsT = {
    tmpPath?: keyof typeof pathObj;
    fileName?: string;
    initTmpsCb: (book?: ExcelJS.Workbook) => Promise<void> | void;
};

export const createDoc = async (settings: CreateDocSettingsT) => {
    if (!settings.fileName) {
        await settings.initTmpsCb();
        return;
    }
    const path = pathObj[settings?.tmpPath] as string;
    const book = settings?.tmpPath ? await readTmp(path) : new ExcelJS.Workbook();

    await settings.initTmpsCb(book);

    await saveFile(book, settings.fileName);
};
