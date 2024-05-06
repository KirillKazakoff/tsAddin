import exportContractStore from '../../../stores/docsStores/exportContractStore';
import { createDoc } from '../../excel/utils/excelUtilsObj/createDoc';
import { PathKeyT } from '../../utils/constants';
import type { ExportGroupT } from './groupAgByNo';
import { initExportInvoicesTmps } from './invoicesTmps/initExportInvoicesTmps';
import { initExportContractTmp } from './сontractTmp/initExportContractTmp';

export const createExportContractDoc = async (agreement: ExportGroupT) => {
    const { invoices } = agreement.groupedBy;
    const { operation } = exportContractStore;
    const { agreementNo, id } = agreement.record;

    let tmpPath: PathKeyT = operation === 'export' ? 'exportContract' : 'exportStorageContract';
    if (agreement.record.terms === 'FCA') tmpPath = 'exportContractFCA';

    await createDoc({
        fileName: `Доп №${agreementNo} (${id})`,
        initTmpsCb: async (book) => {
            await initExportInvoicesTmps(book, invoices);
            await initExportContractTmp(book, agreement);
        },
        tmpPath,
    });
};
