/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';
import { ExportRowT } from '../../types/typesTables';
import { saveFile } from '../excel/saveFile';
import { pathObj } from '../utils/constants';
import { initBlTemplate } from './init/initBlTemplate';
import { readTmp } from './readTmp';

export const createBL = async (row: ExportRowT) => {
    const book = await readTmp(pathObj.bl);
    const newBook = _.cloneDeep(book);
    initBlTemplate(newBook, row);

    await saveFile(newBook, row.blNo);
};
