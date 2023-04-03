/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/no-extraneous-dependencies */
import { saveFile } from '../../excel/utils/saveFile';
import { pathObj } from '../../utils/constants';
import { readTmp } from '../readTmp';
import { AgreementT } from './groupBy/initAgreement';
import { initExportContractTmp } from './initExportContractTmp/initExportContractTmp';

export const createExportContract = async (agreement: AgreementT) => {
    const { agreementNo } = agreement;

    const book = await readTmp(pathObj.exportContract);
    const wsOriginal = book.getWorksheet('Com_Invoice');
    const wsCopyTo = book.addWorksheet('New_Invoice');

    wsCopyTo.model = wsOriginal.model;
    wsCopyTo.name = 'hello';

    wsCopyTo.mergeCells(7, 1, 7, 3);
    wsCopyTo.mergeCells(7, 4, 7, 7);
    wsCopyTo.mergeCells(50, 1, 50, 3);
    wsCopyTo.mergeCells(50, 4, 50, 7);

    console.log(agreement.invoices);
    initExportContractTmp(book, agreement);

    // await saveFile(book, agreementNo);
};
