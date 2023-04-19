import exportContractStore from '../../../stores/docsStores/exportContractStore';
import { InvoicesTmpsSettingsT } from '../../../types/typesExcelUtils';
import { saveFile } from '../../excel/utils/saveFile';
import { pathObj } from '../../utils/constants';
import { readTmp } from '../readTmp';
import { AgreementT } from './groupBy/initAgreement';
import { initInvoicesTmps } from './invoicesTmps/initInvoicesTmps';
import { initComInvoiceTmp } from './invoicesTmps/invoiceTmp/initComInvoiceTmp';
import { initExportContractTmp } from './сontractTmp/exportContractTmp/initExportContractTmp';

export const createExportContractDoc = async (agreement: AgreementT) => {
    const { invoices } = agreement.productsGroupedBy;
    const { agreementNo } = agreement.record;
    const { operation } = exportContractStore;

    const path = operation === 'export'
        ? pathObj.exportContract
        : pathObj.exportStorageContract;
    const book = await readTmp(path);

    const settings: InvoicesTmpsSettingsT = {
        book,
        sheetName: 'Com_Invoice',
        initInvoiceTmpCb: initComInvoiceTmp,
        invoices,
    };
    if (operation === 'export_storage') {
        settings.sheetName = 'Export_Storage_Contract';
        // settings.initInvoiceTmpCb = initNonComInvoiceTmp;
    }

    await initInvoicesTmps(settings);
    initExportContractTmp(book, agreement);

    await saveFile(book, agreementNo);
};
