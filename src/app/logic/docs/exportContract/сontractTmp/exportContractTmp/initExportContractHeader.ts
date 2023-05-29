import exportContractStore from '../../../../../stores/docsStores/exportContractStore';
import {
    CellObjDoubleT,
    InitContractPartT,
} from '../../../../../types/typesExcelUtils';
import { getExcelDateStr } from '../../../../excel/utils/getExcelDate';

export const initExportContractHeader: InitContractPartT = (utils, agreement) => {
    const {
        date, agreementNo, contract, seller, agent,
    } = agreement.record;
    const { podpisant } = exportContractStore.fields;

    const cells: CellObjDoubleT[] = [
        {
            cell: 'Соглашение',
            // prettier-ignore
            eng: `AGREEMENT No. ${agreementNo} dated ${getExcelDateStr(date, 'eng')}`,
            ru: `Дополнение № ${agreementNo} от ${getExcelDateStr(date, 'ru')}`,
        },
        {
            cell: 'Контракт',
            eng: `to a contract of sale No. ${contract.contractNo}`,
            ru: `к контракту купли-продажи № ${contract.contractNo}`,
        },
        {
            cell: 'Контракт_дата',
            eng: `Magadan, dated ${getExcelDateStr(contract.date, 'eng')}`,
            ru: `Магадан от ${getExcelDateStr(contract.date, 'ru')}`,
        },
        {
            cell: 'Продавец',
            eng: seller.eng.name,
            ru: seller.ru.name,
        },
        {
            cell: 'Продавец_адрес',
            eng: seller.eng.addres,
            ru: seller.ru.addres,
        },
        {
            cell: 'Продавец_подписант',
            eng: `${podpisant.eng.name} and`,
            ru: `${podpisant.declination} и`,
        },
        {
            cell: 'Продавец_представитель',
            eng: `${podpisant.eng.comment}`,
            ru: `${podpisant.ru.comment}`,
        },
        {
            cell: 'Покупатель',
            eng: agent.name,
            ru: agent.name,
        },
        {
            cell: 'Покупатель_адрес',
            eng: agent.addres,
            ru: agent.addres,
        },
        {
            cell: 'Покупатель_представитель',
            eng: `Represented by president ${agent.eng.signatory}`,
            ru: `В лице президента ${agent.eng.signatory}`,
        },
    ];

    cells.forEach((cell) => utils.setCell(cell));
};
