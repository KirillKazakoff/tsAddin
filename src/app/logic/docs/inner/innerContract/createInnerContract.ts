import { createDoc } from '../../../excel/utils/excelUtilsObj/createDoc';
import { InnerGroupT } from '../groupInnerContracts';
import { initInnerContractTmp } from './initInnerContractTmp';

export const createInnerContract = async (contract: InnerGroupT) => {
    const { buyer, id } = contract.record.row;

    await createDoc({
        fileName: `Договор ${buyer.code} №${id}`,
        initTmpsCb: async (book) => initInnerContractTmp(book, contract),
        tmpPath: 'innerContract',
    });
};
