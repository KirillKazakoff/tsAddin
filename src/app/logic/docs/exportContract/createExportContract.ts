import { saveFile } from '../../excel/utils/saveFile';
import { pathObj } from '../../utils/constants';
import { readTmp } from '../readTmp';
import { createInvoices } from './createInvoices';
import { AgreementT } from './groupBy/initAgreement';
import { initExportContractTmp } from './initExportContractTmp/initExportContractTmp';

export const createExportContract = async (agreement: AgreementT) => {
    const { agreementNo, invoices } = agreement;
    const book = await readTmp(pathObj.exportContract);

    createInvoices(book, invoices);
    initExportContractTmp(book, agreement);
    await saveFile(book, agreementNo);
};
