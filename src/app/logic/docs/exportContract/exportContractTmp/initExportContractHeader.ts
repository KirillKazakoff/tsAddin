import exportContractStore from '../../../../stores/docsStores/exportContractStore';
import { InitContractPartT } from '../../../../types/typesExcelUtils';
import { getExcelDateStr } from '../../../excel/utils/getExcelDate';

export const initExportContractHeader: InitContractPartT = (utils, agreement) => {
    const { getCell } = utils;
    const {
        agreementDate, agreementNo, contract, sellerInfo, agentInfo,
    } = agreement;
    const { podpisant } = exportContractStore;

    const agreementDateStrRu = getExcelDateStr(agreementDate, 'ru');
    const agreementDateStrEng = getExcelDateStr(agreementDate, 'eng');
    const contractDateStrRu = getExcelDateStr(contract.date, 'ru');
    const contractDateStrEng = getExcelDateStr(contract.date, 'eng');

    // header
    const agreementCl = getCell('Соглашение');
    agreementCl.cellEng.value = `AGREEMENT No. ${agreementNo} dated ${agreementDateStrEng}`;
    agreementCl.cellRus.value = `Дополнение № ${agreementNo} от ${agreementDateStrRu}`;

    const contractCl = getCell('Контракт');
    contractCl.cellEng.value = `to a contract of sale No. ${contract.contractNo}`;
    contractCl.cellRus.value = `к контракту купли-продажи № ${contract.contractNo}`;

    const contractDateCl = getCell('Контракт_дата');
    contractDateCl.cellEng.value = `Magadan, dated ${contractDateStrEng}`;
    contractDateCl.cellRus.value = `Магадан от ${contractDateStrRu}`;

    // body
    // seller
    const sellerCl = getCell('Продавец');
    sellerCl.cellEng.value = sellerInfo.nameEng;
    sellerCl.cellRus.value = sellerInfo.fullName;

    const sellerAddresCl = getCell('Продавец_адрес');
    sellerAddresCl.cellEng.value = sellerInfo.addresEng;
    sellerAddresCl.cellRus.value = sellerInfo.addres;

    const sellerPodpisantCl = getCell('Продавец_подписант');
    sellerPodpisantCl.cellEng.value = `${podpisant.nameEng} and`;
    sellerPodpisantCl.cellRus.value = `${podpisant.declination} и`;

    const sellerRepresentativeCl = getCell('Продавец_представитель');
    sellerRepresentativeCl.cellEng.value = `${podpisant.commentEng}`;
    sellerRepresentativeCl.cellRus.value = `${podpisant.comment}`;

    // buyer
    const buyerCl = getCell('Покупатель');
    buyerCl.cellEng.value = `${agentInfo.name}`;
    buyerCl.cellRus.value = `${agentInfo.name}`;

    const buyerAddressCl = getCell('Покупатель_адрес');
    buyerAddressCl.cellEng.value = `${agentInfo.adress}`;
    buyerAddressCl.cellRus.value = `${agentInfo.adress}`;

    const buyerPodpisantCl = getCell('Покупатель_представитель');
    buyerPodpisantCl.cellEng.value = `Represented by president ${agentInfo.signatoryEng}`;
    buyerPodpisantCl.cellRus.value = `В лице президента ${agentInfo.signatoryEng}`;
};
