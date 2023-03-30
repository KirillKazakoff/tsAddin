/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/no-extraneous-dependencies */
import { saveFile } from '../../excel/utils/saveFile';
import { pathObj } from '../../utils/constants';
import { readTmp } from '../readTmp';
import { AgreementT } from './groupByAggrementNo';
import { initExportContractTmp } from './initExportContractTmp/initExportContractTmp';

export const createExportContract = async (agreement: AgreementT) => {
    const { agreementNo } = agreement;

    const bookContract = await readTmp(pathObj.exportContract);

    initExportContractTmp(bookContract, agreement);

    await saveFile(bookContract, agreementNo);
};
