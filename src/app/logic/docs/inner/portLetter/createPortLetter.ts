import { saveFile } from '../../../excel/utils/saveFile';
import { pathObj } from '../../../utils/constants';
import { readTmp } from '../../readTmp';
import { InnerGroupT } from '../groupInnerContracts';
import { initPortLetterTmp } from './initPortLetterTmp';

export const createPortLetter = async (contract: InnerGroupT) => {
    const book = await readTmp(pathObj.portLetter);
    const { row } = contract.record;

    await initPortLetterTmp(book, contract);

    await saveFile(
        book,
        `Письмо №${contract.record.row.id} ${
            row.type === 'innerT' ? row.buyer.code : `${row.seller.code} Образец`
        }`,
    );
};
