/* eslint-disable import/no-extraneous-dependencies */
import { saveFile } from '../../excel/saveFile';
import { pathObj } from '../../utils/constants';
import { readTmp } from '../readTmp';
import { AgreementT } from './groupByAggrementNo';
import { initExportContractTmp } from './initExportContractTmp/initExportContractTmp';

export const createExportContract = async (agreement: AgreementT) => {
    const { agreementNo } = agreement;

    const book = await readTmp(pathObj.exportContract);
    initExportContractTmp(book, agreement);

    await saveFile(book, agreementNo);
};
