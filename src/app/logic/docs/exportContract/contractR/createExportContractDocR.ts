import exportContractStore from '../../../../stores/docsStores/exportContractStore';
import { initPicturesExcel } from '../../../excel/pictures/initPictureExcel';
import { saveFile } from '../../../excel/utils/saveFile';
import { pathObj } from '../../../utils/constants';
import { readTmp } from '../../readTmp';
import { AgreementT } from '../groupBy/initAgreement';
import { initExportStorageContractTmp } from '../сontractTmp/exportStorageContractTmp/initExportStorageContractTmp';

export const createExportContractDocR = async (agreement: AgreementT) => {
    const book = await readTmp(pathObj.exportStorageContract);
    const { agreementNo, id } = agreement.record;

    initExportStorageContractTmp(book, agreement);
    book.removeWorksheet('Noncom_Invoice');

    const fileName = `Доп №${agreementNo} (${id})`;

    const ws = book.getWorksheet('Export_Storage_Contract');
    await initPicturesExcel(
        [
            {
                key: exportContractStore.fields.podpisant.codeName,
                rangeObj: { start: 'Sign_seller_start', end: 'Seal_seller_end' },
                ws,
            },
            {
                key: agreement.record.seller.codeName,
                rangeObj: { start: 'Seal_seller_start', end: 'Seal_seller_end' },
                ws,
            },
            {
                key: agreement.record.agent.eng.signatory,
                rangeObj: { start: 'Sign_agent_start', end: 'Sign_agent_end' },
                ws,
            },
            {
                key: agreement.record.agent.code,
                rangeObj: { start: 'Seal_agent_start', end: 'Seal_agent_end' },
                ws,
            },
        ],
        true,
    );
    await saveFile(book, fileName);
};
