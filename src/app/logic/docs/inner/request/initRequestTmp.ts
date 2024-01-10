import { Workbook } from 'exceljs';
import requestContractStore from '../../../../stores/docsStores/requestContractStore';
import { CellObjT } from '../../../../types/typesExcelUtils';
import { initExcelUtils } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { getExcelDateNumeric } from '../../../excel/utils/getExcelDate';
import { InnerGroupT } from '../groupByContractNo';
import { initRequestRows } from './initRequestRows';

export const initRequestTmp = (book: Workbook, contract: InnerGroupT) => {
    const ws = book.getWorksheet('Request_Contract');
    const utils = initExcelUtils(ws, '');

    const {
        record: { row },
        total,
    } = contract;
    const {
        portTamozhnya, terms, reiceNo, isInvoiceOnly,
    } = requestContractStore.fields;

    const isVld = portTamozhnya.code === 'Владивосток';
    const isCfrVld = terms.includes('CFR') && isVld;

    let dischargeStr1 = `Приемка по качеству в г.${portTamozhnya.code} в течение 3-х дней_____________________`;
    let dischargeStr2 = '';
    if (terms === 'FCA') {
        dischargeStr1 = ' * Приемка по качеству и количеству осуществляется';
        dischargeStr2 = '   покупателем или его уполномоченным представителем в порту в момент получения товара';
    }

    const date = {
        contract: getExcelDateNumeric(row.contractDate, 'ru'),
        delivery: getExcelDateNumeric(row.deliveryDate, 'ru'),
        payment: getExcelDateNumeric(row.paymentDate, 'ru'),
    };

    // prettier-ignore
    let cells: CellObjT[] = [
        { cell: 'Заявка', value: `Прошу разработать договор поставки № ${row.id} от ${date.contract}` },
        { cell: 'Заявка_дата', value: date.contract },
        { cell: 'Заявка_стороны', value: `между ${row.seller.ru.name} (ПОСТАВЩИК) и ${row.buyer.name}` },
        { cell: 'Сумма', value: `Сумма по договору : ${total.priceTotal.str} руб.` },
        { cell: 'Доставка_условия', value: `На условиях ${terms} ${portTamozhnya.ru.name}` },
        { cell: 'Оплата_дата', value: `Порядок расчетов: 100% до ${date.payment} путем перечисления на р/с Продавца по счету` },
        { cell: 'Банковские_реквизиты', value: `Указать банковские реквизиты ${row.seller.ru.name} в ${row.bankSeller.ru.name}____________` },
        { cell: 'Прибытие', value: terms === 'EXW' ? `Товар передается в порту г. ${portTamozhnya.ru.name}` : ` * Поставка товара транспортом ${row.transport.ru.name} ${reiceNo ? `(рейс №${reiceNo})` : ''} ориентировочно ${date.delivery} (Зафрахтован Продавцом).` },
        { cell: 'Приемка1', value: dischargeStr1 },
        { cell: 'Приемка2', value: dischargeStr2, isEmpty: terms !== 'FCA' },
        { cell: 'ВСД', value: isCfrVld ? '* Ветеринарно-сопроводительные документы (ВСД) оформляются Продавцом до порта назначения.' : '' },
        { cell: 'ВСД_далее', value: isCfrVld ? 'Дальнейшее оформление ВСД осуществляет Покупатель за свой счет и своими силами.' : '' },
    ];

    if (isInvoiceOnly) {
        const sumRow = utils.getRow('Сумма', 1);
        utils.ws.spliceRows(sumRow.number, 2);

        const arrivalRow = utils.getRow('Прибытие', 0);
        utils.ws.spliceRows(arrivalRow.number, 10);

        // prettier-ignore
        cells = [
            { cell: 'Заявка', value: `Прошу разработать Счет от ${date.contract}` },
            { cell: 'Заявка_дата', value: date.contract },
            { cell: 'Заявка_стороны', value: `между ${row.seller.ru.name} (ПОСТАВЩИК) и ${row.buyer.name}` },
            { cell: 'Сумма', value: `Сумма по договору : ${total.priceTotal.str} Р` },
            { cell: 'Банковские_реквизиты', value: `Указать банковские реквизиты ${row.seller.ru.name} в ${row.bankSeller}____________` },
        ];
    }

    initRequestRows(contract.groupedBy.request, utils);

    cells.forEach((cell) => {
        utils.setCell(cell);
    });
};