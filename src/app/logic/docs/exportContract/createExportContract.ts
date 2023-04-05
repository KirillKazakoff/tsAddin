import { saveFile } from '../../excel/utils/saveFile';
import { pathObj } from '../../utils/constants';
import { readTmp } from '../readTmp';
import { createInvoices } from './invoiceTmp/createInvoices';
import { AgreementT } from './groupBy/initAgreement';
import { initExportContractTmp } from './exportContractTmp/initExportContractTmp';

export const createExportContract = async (agreement: AgreementT) => {
    const { agreementNo, invoices } = agreement;
    const book = await readTmp(pathObj.exportContract);

    await createInvoices(book, invoices);
    initExportContractTmp(book, agreement);
    await saveFile(book, agreementNo);
};
