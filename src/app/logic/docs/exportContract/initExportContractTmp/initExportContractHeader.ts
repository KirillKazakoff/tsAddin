import exportContractStore from '../../../../stores/docsStores/exportContractStore';
import { InitExportPart } from '../../../../types/typesUtils';
import { getExcelDateStr } from '../../../excel/getExcelDate';

export const initExportContractHeader: InitExportPart = (getCell, agreement) => {
    const {
        agreementDate,
        agreementNo,
        contract,
        sellerInfo,
        buyerInfo,
        agentInfo,
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
    const sellerCl = getCell('Продавец');
    sellerCl.cellEng.value = sellerInfo.nameEng;
    sellerCl.cellRus.value = sellerInfo.fullName;

    const sellerAddresCl = getCell('Продавец_адрес');
    sellerAddresCl.cellEng.value = sellerInfo.addresEng;
    sellerAddresCl.cellRus.value = sellerInfo.addres;

    const sellerPodpisantCl = getCell('Продавец_подписант');
    sellerPodpisantCl.cellEng.value = `${podpisant.nameEng} and`;
    sellerPodpisantCl.cellRus.value = `${podpisant.declination} и`;

    const buyerCl = getCell('Покупатель');
    buyerCl.cellEng.value = `${buyerInfo.fullName}`;
    buyerCl.cellRus.value = `${buyerInfo.fullName}`;

    const buyerAddressCl = getCell('Покупатель_адрес');
    buyerAddressCl.cellEng.value = `${buyerInfo.adress}`;
    buyerAddressCl.cellRus.value = `${buyerInfo.adress}`;

    const buyerPodpisantCl = getCell('Покупатель_представитель');
    buyerPodpisantCl.cellEng.value = `Represented by president ${agentInfo.signatoryEng}`;
    buyerPodpisantCl.cellRus.value = `В лице президента ${agentInfo.signatoryEng}`;
};
