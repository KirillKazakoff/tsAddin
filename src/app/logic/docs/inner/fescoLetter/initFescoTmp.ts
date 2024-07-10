import { Workbook } from 'exceljs';
import { FescoGroupT } from './groupFesco';
import { initExcelUtils } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import fescoLetterStore from '../../../../stores/docsStores/fescoLetterStore';
import { initPictureGit } from '../../../excel/pictures/initPictureGit';
import { pathObj } from '../../../utils/constants';
import { getFescoLetterCells } from './getFescoLetterCells';
import { initFescoRows } from './initFescoRows';

export const initFescoTmp = async (book: Workbook, doc: FescoGroupT) => {
    const ws = book.getWorksheet('Fesco_Letter');
    const utils = initExcelUtils(ws, '');
    const { isPictures, podpisant } = fescoLetterStore.fields;
    const { seller } = doc.record.row;

    await initPictureGit({
        url: seller.code === 'ТРК' ? pathObj.pictures.trk : pathObj.pictures.msi,
        ws,
        rangeObj: { start: 'Banner_start', end: 'Banner_end' },
    });

    await utils.initTmp({
        cells: getFescoLetterCells(doc),
        initRows: () => initFescoRows(doc, utils),
        mergeCells: [
            {
                row: {
                    from: { name: 'Письмо_электропитание' },
                    to: { name: 'Merge_end' },
                },
                cols: [{ start: 'Banner_start', end: 'Pg_end' }],
            },
        ],
        pictureSettings: {
            isActive: isPictures,
            settings: [
                {
                    key: podpisant.code,
                    range: {
                        start: 'Sign_seller_start',
                        ext: { height: 65, width: 170 },
                    },
                },
                {
                    key: seller.code,
                    range: {
                        start: 'Seal_seller_start',
                        ext: { height: 175, width: 175 },
                    },
                },
            ],
        },
    });
};
