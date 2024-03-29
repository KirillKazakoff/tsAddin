import portLetterStore from '../../../../stores/docsStores/portLetterStore';
import { initPictureGit } from '../../../excel/pictures/initPictureGit';
import { initExcelUtils } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { saveFile } from '../../../excel/utils/saveFile';
import { pathObj } from '../../../utils/constants';
import { readTmp } from '../../readTmp';
import { InnerGroupT } from '../groupInnerContracts';
import { initPortLetterTmp } from './initPortLetterTmp';

export const createPortLetter = async (contract: InnerGroupT) => {
    const { row } = contract.record;
    const { podpisant, isPictures } = portLetterStore.fields;
    const { seller } = row;

    // getPathToTemplate
    const book = await readTmp(pathObj.portLetter);
    const ws = book.getWorksheet('Port_Letter');
    const utils = initExcelUtils(ws, '');

    // save order (tmp first then pictures)
    initPortLetterTmp(book, contract);

    await initPictureGit({
        url: seller.code === 'ТРК' ? pathObj.bg.trk : pathObj.bg.msi,
        ws,
        rangeObj: { start: 'Banner_start', end: 'Banner_end' },
    });
    await utils.initPictures(
        [
            {
                key: podpisant.code,
                range: { start: 'Sign_seller_start', ext: { height: 65, width: 170 } },
            },
            {
                key: seller.code,
                range: { start: 'Seal_seller_start', ext: { height: 175, width: 175 } },
            },
        ],
        isPictures,
    );

    await saveFile(
        book,
        `Письмо №${contract.record.row.id} ${
            row.type === 'innerT' ? row.buyer.code : `${row.seller.code} Образец`
        }`,
    );
};
