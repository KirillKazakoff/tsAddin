import { Workbook } from 'exceljs';
import { initExcelUtils } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { initPortLetterRows } from './initPortLetterRows';
import { getPortLetterCells } from './getPortLetterCells';
import { InnerGroupT } from '../groupInnerContracts';
import portLetterStore from '../../../../stores/docsStores/portLetterStore';
import { initPictureGit } from '../../../excel/pictures/initPictureGit';
import { pathObj } from '../../../utils/constants';

export const initPortLetterTmp = async (book: Workbook, contract: InnerGroupT) => {
    const ws = book.getWorksheet('Port_Letter');
    const utils = initExcelUtils(ws, '');
    const { podpisant, isPictures } = portLetterStore.fields;
    const { seller } = contract.record.row;

    await utils.initTmp({
        cells: getPortLetterCells(contract),
        initRows: () => initPortLetterRows(contract, utils),
        mergeCells: [
            {
                row: {
                    from: { name: 'Образцы_выдача' },
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
                    key: contract.record.row.seller.code,
                    range: {
                        start: 'Seal_seller_start',
                        ext: { height: 175, width: 175 },
                    },
                },
            ],
        },
    });

    await initPictureGit({
        url: seller.code === 'ТРК' ? pathObj.bg.trk : pathObj.bg.msi,
        ws,
        rangeObj: { start: 'Banner_start', end: 'Banner_end' },
    });
};
