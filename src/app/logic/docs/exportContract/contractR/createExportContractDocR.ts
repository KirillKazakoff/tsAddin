import { saveFile } from '../../../excel/utils/saveFile';
import { pathObj } from '../../../utils/constants';
import { readTmp } from '../../readTmp';
import { AgreementT } from '../groupBy/initAgreement';
import { initExportStorageContractTmp } from '../сontractTmp/exportStorageContractTmp/initExportStorageContractTmp';

export const createExportContractDocR = async (agreement: AgreementT) => {
    const book = await readTmp(pathObj.exportStorageContract);
    const { agreementNo, id } = agreement.record;

    initExportStorageContractTmp(book, agreement);
    book.removeWorksheet('Noncom_Invoice');

    const fileName = `Доп №${agreementNo} (${id})`;
    await saveFile(book, fileName);
};
