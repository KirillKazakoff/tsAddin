import picturesStore from '../../../stores/picturesStore/picturesStore';
import { saveFile } from '../../excel/utils/saveFile';
import { pathObj } from '../../utils/constants';
import { readTmp } from '../readTmp';
import { ContractT } from './groupByContractNo';
import { initPortLetterTmp } from './portLetterTmp/initPortLetterTmp';

const blobFromBase64String = (base64String) => {
    const byteArray = Uint8Array.from(
        window
            .atob(base64String)
            .split('')
            .map((char) => char.charCodeAt(0)),
    );
    return new Blob([byteArray]);
};

export const createPortLetter = async (contract: ContractT) => {
    const { record } = contract;
    const book = await readTmp(pathObj.portLetter);

    const url = contract.record.seller.codeName === 'ТРК' ? pathObj.bg.trk : pathObj.bg.msi;
    const blob = await (await fetch(url)).blob();
    const reader = new FileReader();
    const reader2 = new FileReader();

    const blob2 = blobFromBase64String(picturesStore.picture);

    reader.onload = async function callback() {
        const imgId = book.addImage({
            base64: this.result as string,
            extension: 'png',
        });

        const ws = book.getWorksheet('Port_Letter');
        ws.addImage(imgId, 'A1:F14');

        reader2.onload = async function callback2() {
            const imgId2 = book.addImage({
                base64: this.result as string,
                extension: 'png',
            });

            const ws2 = book.getWorksheet('Port_Letter');
            ws2.addImage(imgId2, 'C45:D54');

            initPortLetterTmp(book, contract);
            await saveFile(book, `Письмо ${record.buyer.codeName}`);
        };
        reader2.readAsDataURL(blob2);
        // initPortLetterTmp(book, contract);
        // await saveFile(book, `Письмо ${record.buyer.codeName}`);
    };
    reader.readAsDataURL(blob);
};
