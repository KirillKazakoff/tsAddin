import { Workbook } from 'exceljs';
import requestContractStore from '../../../../stores/docsStores/requestContractStore';
import { CellObjT } from '../../../../types/typesExcelUtils';
import { initExcelUtils } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { getExcelDateNumeric } from '../../../excel/utils/getExcelDate';
import { ContractT } from '../groupByContractNo';
import { initRequestRows } from './initRequestRows';

export const initRequestTmp = (book: Workbook, contract: ContractT) => {
    const ws = book.getWorksheet('Request_Contract');
    const utils = initExcelUtils(ws);

    const { record, priceTotal, requests } = contract;
    const {
        portRu, portTamozhnya, terms, reiceNo,
    } = requestContractStore.fields;

    const isVld = portTamozhnya.codeName === 'Владивосток';
    const isCfrVld = terms.includes('CFR') && isVld;

    let dischargeStr1 = `Приемка по качеству в г.${portTamozhnya.codeName} в течение 3-х дней_____________________`;
    let dischargeStr2 = '';
    if (terms === 'FCA') {
        dischargeStr1 = ' * Приемка по качеству и количеству осуществляется';
        dischargeStr2 = '   покупателем или его уполномоченным представителем в порту в момент получения товара';
    }

    // prettier-ignore
    const cells: CellObjT[] = [
        { cell: 'Заявка', value: `Прошу разработать договор поставки № ${record.contractNo} от ${getExcelDateNumeric(record.contractDate, 'ru')}` },
        { cell: 'Заявка_дата', value: getExcelDateNumeric(record.contractDate, 'ru') },
        { cell: 'Заявка_стороны', value: `между ${record.seller.ru.name} (ПОСТАВЩИК) и ${record.buyer.name}` },
        { cell: 'Сумма', value: `Сумма по договору : ${priceTotal.str} Р` },
        { cell: 'Доставка_условия', value: `На условиях ${terms} ${portTamozhnya.ru.name} ${portRu.name}` },
        { cell: 'Оплата_дата', value: `Порядок расчетов: 100% до ${getExcelDateNumeric(record.paymentDate, 'ru')} путем перечисления на р/с Продавца по счету` },
        { cell: 'Банковские_реквизиты', value: `Указать банковские реквизиты ${record.seller.ru.name} в ${record.bankSeller}____________` },
        { cell: 'Прибытие', value: ` * Поставка товара транспортом ${record.transport.ru.name} рейс №${reiceNo} ориентировочно (Зафрахтован Продавцом).` },
        { cell: 'Приемка1', value: dischargeStr1 },
        { cell: 'Приемка2', value: dischargeStr2 },
        { cell: 'ВСД', value: isCfrVld ? '* Ветеринарно-сопроводительные документы (ВСД) оформляются Продавцом до порта назначения.' : '' },
        { cell: 'ВСД_далее', value: isCfrVld ? 'Дальнейшее оформление ВСД осуществляет Покупатель за свой счет и своими силами.' : '' },
    ];

    initRequestRows(requests, utils);

    cells.forEach((cell) => {
        utils.setCell(cell);
    });
};
