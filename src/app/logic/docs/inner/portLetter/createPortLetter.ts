import { createDoc } from '../../../excel/utils/excelUtilsObj/createDoc';
import { InnerGroupT } from '../groupInnerContracts';
import { initPortLetterTmp } from './initPortLetterTmp';

export const createPortLetter = async (contract: InnerGroupT) => {
    const { row } = contract.record;

    await createDoc({
        tmpPath: 'portLetter',
        initTmpsCb: async (book) => initPortLetterTmp(book, contract),
        fileName: `Письмо №${row.id} ${
            row.type === 'innerT' ? row.buyer.code : `${row.seller.code} Образец`
        }`,
    });
};
