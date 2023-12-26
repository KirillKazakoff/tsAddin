import exportContractStore from '../../../stores/docsStores/exportContractStore';
import { saveFile } from '../../excel/utils/saveFile';
import { pathObj } from '../../utils/constants';
import { readTmp } from '../readTmp';
import type { ExportGroupT } from './groupAgByNo';
import { initExportInvoicesTmps } from './invoicesTmps/initExportInvoicesTmps';
import { initExportContractTmp } from './сontractTmp/initExportContractTmp';

export const createExportContractDoc = async (agreement: ExportGroupT) => {
    const { invoices } = agreement.groupedBy;
    const { operation } = exportContractStore;
    const { agreementNo, id } = agreement.record;

    let path = operation === 'export' ? pathObj.exportContract : pathObj.exportStorageContract;
    if (agreement.record.terms === 'FCA') path = pathObj.exportContractFCA;

    const book = await readTmp(path);

    // save call order (init invoices then contract)
    await initExportInvoicesTmps(book, invoices);
    await initExportContractTmp(book, agreement);
    const fileName = `Доп №${agreementNo} (${id})`;

    await saveFile(book, fileName);
};
