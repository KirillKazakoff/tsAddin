import portLetterStore from '../../../stores/docsStores/portLetterStore';
import { selectPicture } from '../../../stores/picturesStore/selectPicture';
import { getPictureRange } from '../../excel/pictures/getPictureRange';
import { initPicture } from '../../excel/utils/blobFromBase64';
import { saveFile } from '../../excel/utils/saveFile';
import { pathObj } from '../../utils/constants';
import { readTmp } from '../readTmp';
import { ContractT } from './groupByContractNo';
import { initPortLetterTmp } from './portLetterTmp/initPortLetterTmp';

export const createPortLetter = async (contract: ContractT) => {
    const { record } = contract;
    const book = await readTmp(pathObj.portLetter);
    const { podpisant } = portLetterStore.store;

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

        await initPicture({
            key: selectPicture(podpisant.codeName),
            book,
            range: getPictureRange('Sign_seller_start', 'Sign_seller_end', ws),
            sheetName: 'Port_Letter',
        });
        await initPicture({
            key: selectPicture(seller.codeName),
            book,
            range: getPictureRange('Seal_seller_start', 'Seal_seller_end', ws),
            sheetName: 'Port_Letter',
        });

        await saveFile(book, `Письмо ${record.buyer.codeName}`);
    };
    reader.readAsDataURL(blob);
};
