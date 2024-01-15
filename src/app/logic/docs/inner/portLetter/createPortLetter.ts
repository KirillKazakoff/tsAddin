import portLetterStore from '../../../../stores/docsStores/portLetterStore';
import { initPictureGit } from '../../../excel/pictures/initPictureGit';
import { initExcelUtils } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { saveFile } from '../../../excel/utils/saveFile';
import { pathObj } from '../../../utils/constants';
import { readTmp } from '../../readTmp';
import { InnerGroupT } from '../groupByContractNo';
import { initPortLetterTmp } from './initPortLetterTmp';

export const createPortLetter = async (contract: InnerGroupT) => {
    const { row } = contract.record;
    const { podpisant, isPictures } = portLetterStore.fields;
    const { seller } = row;

    // getPathToTemplate
    const path = portLetterStore.fields.termsPort === 'FCA'
        ? pathObj.portLetterFCA
        : pathObj.portLetter;
    const book = await readTmp(path);
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
                range: {
                    start: 'Sign_seller_start',
                    end: `${
                        portLetterStore.fields.termsPort === 'FCA'
                            ? 'Sign_seller_start'
                            : 'Sign_seller_end'
                    }`,
                },
            },
            {
                key: seller.code,
                range: { start: 'Seal_seller_start', end: 'Seal_seller_end' },
            },
        ],
        isPictures,
    );

    await saveFile(book, `Письмо ${contract.index} ${row.buyer.code}`);
};
