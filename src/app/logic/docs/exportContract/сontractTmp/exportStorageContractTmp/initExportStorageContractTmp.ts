import exportContractStore from '../../../../../stores/docsStores/exportContractStore';
import {
    CellObjDoubleT,
    InitExportContractTmp,
} from '../../../../../types/typesExcelUtils';
import { initExcelUtilsDouble } from '../../../../excel/utils/excelUtilsObj/initExcelUtils';
import { getExcelDateStr } from '../../../../excel/utils/getExcelDate';
import { initExportContractAddreses } from '../initExportContractAddreses';
import { initExportStorageContractRows } from './initExportStorageContractRows';

export const initExportStorageContractTmp: InitExportContractTmp = (
    book,
    agreement,
) => {
    const ws = book.getWorksheet('Export_Storage_Contract');
    const utils = initExcelUtilsDouble(ws, 2);
    const {
        date: dateAgreement,
        agreementNo,
        contract,
        seller,
        agent,
        portTo,
        transport,
    } = agreement.record;
    const { podpisant } = exportContractStore;

    const date = {
        agreement: (locale: string) => getExcelDateStr(dateAgreement, locale),
        contract: (locale: string) => getExcelDateStr(contract.date, locale),
    };

    // prettier-ignore
    const cells: CellObjDoubleT[] = [
        {
            cell: 'Соглашение',
            eng: `AGREEMENT No. ${agreementNo} dated ${date.agreement('eng')}`,
            ru: `Дополнение № ${agreementNo} от ${date.agreement('ru')}`,
        },
        {
            cell: 'Контракт',
            eng: `to a contract of sale No. ${contract.contractNo}`,
            ru: `к контракту купли-продажи № ${contract.contractNo}`,
        },
        {
            cell: 'Контракт_дата',
            eng: `Magadan, dated ${date.contract('eng')}`,
            ru: `Магадан от ${date.contract('ru')}`,
        },
        {
            cell: 'Контракт_стороны',

            eng: `${agent.name} ( ${portTo.eng.country}, ${portTo.eng.name} ), here in after referred to as Contractor, represented by the President ${agent.eng.signatory} on one part, and ${seller.eng.name}, (Russia, Magadan), here in after referred to as Customer, represented by the ${podpisant.eng.comment}${podpisant.eng.name}, acting on the basis of the Charter, on the other part, have concluded this Supplementary Agreement on the following:`,

            ru: `${agent.name} ( ${portTo.ru.country}, г.${portTo.ru.name} ), именуемое в дальнейшем "Исполнитель", в лице президента ${agent.ru.signatory} с одной стороны, и ${seller.ru.name} (Россия, г. Магадан) именуемое в дальнейшем "Заказчик", в лице ${podpisant.ru.comment}${podpisant.declination}, действующего на основании Устава, с другой стороны, заключили настоящее Дополнительное соглашение о нижеследующем:`,
        },
        {
            cell: 'Обязательство_хранение',

            eng: `1. The Contractor shall undertake to accept for storage on the refrigerator, located in ${portTo.eng.name}, ${portTo.eng.country}, the batch of:`,

            ru: `1. Исполнитель обязуется принять на хранение на холодильник расположенный в г. ${portTo.ru.name}, ${portTo.ru.country}, переданную Заказчиком партию:`,
        },
        {
            cell: 'Доставка_транспорт',

            eng: `2. The Goods will be delivered to ${portTo.eng.name}, ${portTo.eng.country} by the transport vessel ${transport.eng.name} no later than ${date.agreement('eng')}`,

            ru: `2. Товар будет доставлен в г. ${portTo.ru.name}, ${portTo.ru.country} транспортным судном ${transport.ru.name} не позднее чем ${date.agreement('ru')}`,
        },
        {
            cell: 'Остальное_контракт',

            eng: `3. In all other matters not covered by this Supplementary Agreement, the parties shall be governed by the terms and conditions of Storage Services Contract No. ${contract.contractNo}, dated ${date.contract('eng')}`,

            ru: `3. Во всем остальном, что не предусмотрено настоящим дополнительным соглашением, стороны руководствуются условиями договора оказания услуг хранения ${contract.contractNo} от ${date.contract('ru')}`,
        },
        {
            cell: 'Соглашение_вступление',

            eng: `4. The present Supplementary Agreement shall come into force from the moment of its signing and is an integral part of the Storage Services Contract No. ${contract.contractNo} dated ${date.contract('eng')}`,

            ru: `4. Настоящее дополнительное соглашение вступает в силу с момента его подписания и является неотъемлемой частью договора оказания услуг хранения № ${contract.contractNo} от ${date.contract('ru')}`,
        },
        {
            cell: 'Юридикция',

            eng: '5. This Supplementary Agreement has been drawn up and signed in two original duplicates of equal legal force.',

            ru: '5. Настоящее дополнительное соглашение составлено и подписано в двух подлинных экземплярах, имеющих одинаковую юридическую силу.',
        },
    ];

    cells.forEach((cell) => utils.setCell(cell));

    initExportContractAddreses(utils, agreement);
    initExportStorageContractRows(agreement.productsGroupedBy.consignees, utils);

    // mergeCells
    const startRow = utils.getRow('Доставка_транспорт', 0).number;
    const endRow = utils.getRow('Адреса_подпись', 0).number;

    for (let i = startRow; i <= endRow; i += 1) {
        utils.mergeCells({ row: i, startCol: 2, endCol: 3 });
        utils.mergeCells({ row: i, startCol: 4, endCol: 5 });
    }
};
