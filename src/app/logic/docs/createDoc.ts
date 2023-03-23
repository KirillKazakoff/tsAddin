/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';
import { ExportRowT } from '../../types/typesTables';
import { saveFile } from '../excel/saveFile';
import { pathObj } from '../utils/constants';
import { initBlTmp } from './init/initBlTmp';
import { initExportContractTmp } from './init/initExportContractTmp';
import { readTmp } from './readTmp';

export const createBL = async (row: ExportRowT) => {
    const book = await readTmp(pathObj.bl);
    initBlTmp(book, row);

    await saveFile(book, row.blNo);
};

export const createExportContract = async (row: ExportRowT) => {
    const book = await readTmp(pathObj.exportContract);
    initExportContractTmp(book, row);

    // console.log(row);
    await saveFile(book, row.aggrementNo);
    //
};
