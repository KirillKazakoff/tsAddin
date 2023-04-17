import { saveFile } from '../../excel/utils/saveFile';
import { pathObj } from '../../utils/constants';
import { readTmp } from '../readTmp';
import { AgreementT } from './groupBy/initAgreement';
import { initExportContractTmp } from './exportContractTmp/initExportContractTmp';
import { initInvoicesTmps } from './invoicesTmps/initInvoicesTmps';

export const createExportContractDoc = async (agreement: AgreementT) => {
    const { invoices } = agreement.productsGroupedBy;
    const { agreementNo } = agreement.record;
    const book = await readTmp(pathObj.exportContract);

    await initInvoicesTmps(book, invoices);
    await initExportContractTmp(book, agreement);

    await saveFile(book, agreementNo);
};
