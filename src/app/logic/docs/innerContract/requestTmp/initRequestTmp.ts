import { Workbook } from 'exceljs';
import requestContractStore from '../../../../stores/docsStores/requestContractStore';
import { selectTransportSp } from '../../../../stores/spsStore/select';
import { initExcelUtils } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { getExcelDateNumeric } from '../../../excel/utils/getExcelDate';
import { ContractT } from '../groupByContractNo';
import { initRequestRows } from './initRequestRows';

export const initRequestTmp = (book: Workbook, contract: ContractT) => {
    const ws = book.getWorksheet('Request_Contract');
    const utils = initExcelUtils(ws);
    const { setCell } = utils;

    const { record, priceTotal, rows } = contract;
    const { portRu, portTamozhnya, terms } = requestContractStore;

    const isVld = portTamozhnya.codeName === 'Владивосток';
    const isCfrVld = terms.includes('CFR') && isVld;
    // prettier-ignore
    const cells = [
        { cell: 'Заявка', value: `Прошу разработать договор поставки № ${record.contractNo} от ${record.contractDate}` },
        { cell: 'Заявка_дата', value: getExcelDateNumeric(record.contractDate, 'ru') },
        { cell: 'Заявка_стороны', value: `между ${record.seller.ru.name} (ПОСТАВЩИК) и ${record.buyer.name}` },
        { cell: 'Сумма', value: `Сумма по договору : ${priceTotal.str} Р` },
        { cell: 'Доставка_условия', value: `На условиях ${terms} ${portTamozhnya.ru.name} ${portRu.name}` },
        { cell: 'Оплата_дата', value: `Порядок расчетов: 100% до ${getExcelDateNumeric(record.paymentDate, 'ru')} путем перечисления на р/с Продавца по счету` },
        { cell: 'Банковские_реквизиты', value: `Указать банковские реквизиты ${record.seller.ru.name} в ${record.bankSeller}____________` },
        { cell: 'Прибытие', value: ` * поставка товара транспортом ${selectTransportSp().ru.name} ориентировочно (Зафрахтован Продавцом).` },
        { cell: 'Приемка', value: `приемка по качеству в г.${portTamozhnya.codeName} в течение 3-х дней_____________________` },
        { cell: 'ВСД', value: isCfrVld ? '* Ветеринарно-сопроводительные документы (ВСД) оформляются Продавцом до порта назначения.' : '' },
        { cell: 'ВСД_далее', value: isCfrVld ? 'Дальнейшее оформление ВСД осуществляет Покупатель за свой счет и своими силами.' : '' },
    ];

    initRequestRows(rows, utils);

    cells.forEach((cell) => setCell(cell));
};
