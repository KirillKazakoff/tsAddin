import portLetterStore from '../../../stores/docsStores/portLetterStore';
import { initPictures } from '../../excel/pictures/initPicture';
import { saveFile } from '../../excel/utils/saveFile';
import { pathObj } from '../../utils/constants';
import { readTmp } from '../readTmp';
import { ContractT } from './groupByContractNo';
import { initPortLetterTmp } from './portLetterTmp/initPortLetterTmp';

export const createPortLetter = async (contract: ContractT) => {
    const { record } = contract;
    const book = await readTmp(pathObj.portLetter);
    const { podpisant, isPicturesActive } = portLetterStore.store;

    const { seller } = contract.record;
    const url = seller.codeName === 'ТРК' ? pathObj.bg.trk : pathObj.bg.msi;
    const blob = await (await fetch(url)).blob();
    const reader = new FileReader();

    reader.onload = async function callback() {
        const imgId = book.addImage({
            base64: this.result as string,
            extension: 'png',
        });

        const ws = book.getWorksheet('Port_Letter');
        ws.addImage(imgId, 'A1:F14');

        // save order (tmp first then pictures)
        initPortLetterTmp(book, contract);
        // prettier-ignore
        await initPictures(
            [
                {
                    key: podpisant.codeName,
                    rangeObj: { start: 'Sign_seller_start', end: 'Sign_seller_end' },
                    sheetName: 'Port_Letter',
                    book,
                },
                {
                    key: seller.codeName,
                    rangeObj: { start: 'Seal_seller_start', end: 'Seal_seller_end' },
                    sheetName: 'Port_Letter',
                    book,
                },
            ],
            isPicturesActive,
        );

        await saveFile(book, `Письмо ${record.buyer.codeName}`);
    };
    reader.readAsDataURL(blob);
};
