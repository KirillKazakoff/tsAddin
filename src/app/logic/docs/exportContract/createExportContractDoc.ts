import exportContractStore from '../../../stores/docsStores/exportContractStore';
import { InvoicesTmpsSettingsT } from '../../../types/typesExcelUtils';
import { saveFile } from '../../excel/utils/saveFile';
import { pathObj } from '../../utils/constants';
import { readTmp } from '../readTmp';
import { AgreementT } from './groupBy/initAgreement';
import { initInvoicesTmps } from './invoicesTmps/initInvoicesTmps';
import { initComInvoiceTmp } from './invoicesTmps/invoiceTmp/initComInvoiceTmp';
import { initNonComInvoiceTmp } from './invoicesTmps/invoiceTmp/initNonComInvoiceTmp';
import { initExportContractTmp } from './сontractTmp/exportContractTmp/initExportContractTmp';
import { initExportStorageContractTmp } from './сontractTmp/exportStorageContractTmp/initExportStorageContractTmp';

export const createExportContractDoc = async (agreement: AgreementT) => {
    const { invoices } = agreement.productsGroupedBy;
    const { operation } = exportContractStore;

    // getPathToTemplate
    let path = operation === 'export'
        ? pathObj.exportContract
        : pathObj.exportStorageContract;
    if (agreement.record.terms === 'FCA') path = pathObj.exportContractFCA;

    const book = await readTmp(path);

    const settings: InvoicesTmpsSettingsT = {
        book,
        sheetName: 'Com_Invoice',
        initInvoiceTmpCb: initComInvoiceTmp,
        invoices,
    };

    if (operation === 'export_storage') {
        settings.sheetName = 'Noncom_Invoice';
        settings.initInvoiceTmpCb = initNonComInvoiceTmp;
    }

    // save call order (contract - invoices)
    await initInvoicesTmps(settings);

    if (operation === 'export_storage') {
        initExportStorageContractTmp(book, agreement);
    } else {
        initExportContractTmp(book, agreement);
    }

    const fileName = `Доп №${agreement.record.agreementNo}`;
    await saveFile(book, fileName);
};
