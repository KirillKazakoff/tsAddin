import { saveFile } from '../../excel/utils/saveFile';
import { pathObj } from '../../utils/constants';
import { readTmp } from '../readTmp';
import { ContractT } from './groupByContractNo';
import { initPortLetterTmp } from './portLetterTmp/initPortLetterTmp';

export const createPortLetter = async (contract: ContractT) => {
    const { record } = contract;
    const book = await readTmp(pathObj.portLetter);

    const url = contract.record.seller.codeName === 'ТРК' ? pathObj.bg.trk : pathObj.bg.msi;
    const blob = await (await fetch(url)).blob();
    const reader = new FileReader();

    reader.onload = async function callback() {
        const imgId = book.addImage({
            base64: this.result as string,
            extension: 'png',
        });

        const ws = book.getWorksheet('Port_Letter');
        ws.addImage(imgId, 'A1:F14');

        initPortLetterTmp(book, contract);
        await saveFile(book, `Письмо ${record.buyer.codeName}`);
    };
    reader.readAsDataURL(blob);
};
