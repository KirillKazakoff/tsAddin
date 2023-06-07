import _ from 'lodash';
import portLetterStore from '../../../stores/docsStores/portLetterStore';
import { initPicturesExcel } from '../../excel/pictures/initPictureExcel';
import { initPictureGit } from '../../excel/pictures/initPictureGit';
import { saveFile } from '../../excel/utils/saveFile';
import { pathObj } from '../../utils/constants';
import { readTmp } from '../readTmp';
import { ContractT } from './groupByContractNo';
import { initPortLetterTmp } from './portLetterTmp/initPortLetterTmp';
import { initPortLetterTmpFCA } from './portLetterTmp/initPortLetterTmpFCA';

export const createPortLetter = async (contract: ContractT) => {
    setTimeout(async () => {
        const { record } = contract;
        const { podpisant, isPictures } = portLetterStore.fields;
        const { seller } = contract.record;

        // getPathToTemplate
        console.log(_.cloneDeep(portLetterStore));

        const path = portLetterStore.fields.termsPort === 'FCA'
            ? pathObj.portLetterFCA
            : pathObj.portLetter;
        const book = await readTmp(path);
        const ws = book.getWorksheet('Port_Letter');

        // save order (tmp first then pictures)
        if (portLetterStore.fields.termsPort === 'FCA') {
            initPortLetterTmpFCA(book, contract);
        } else {
            initPortLetterTmp(book, contract);
        }

        await initPictureGit({
            url: seller.codeName === 'ТРК' ? pathObj.bg.trk : pathObj.bg.msi,
            ws,
            rangeObj: { start: 'Banner_start', end: 'Banner_end' },
        });
        await initPicturesExcel(
            [
                {
                    key: podpisant.codeName,
                    rangeObj: {
                        start: 'Sign_seller_start',
                        end: `${
                            portLetterStore.fields.termsPort === 'FCA'
                                ? 'Sign_seller_start'
                                : 'Sign_seller_end'
                        }`,
                    },
                    ws,
                },
                {
                    key: seller.codeName,
                    rangeObj: { start: 'Seal_seller_start', end: 'Seal_seller_end' },
                    ws,
                },
            ],
            isPictures,
        );

        await saveFile(book, `Письмо ${record.buyer.codeName}`);
    }, 1000);
};
