import { Workbook } from 'exceljs';
import portLetterStore from '../../../../stores/docsStores/portLetterStore';
import { CellObjT } from '../../../../types/typesExcelUtils';
import { initExcelUtils } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { InnerGroupT } from '../groupByContractNo';
import { initPortLetterRows } from './initPortLetterRows';
import spsStore from '../../../../stores/spsStore/spsStore';
import popupStore from '../../../../stores/popupStore.ts/popupStore';
import { getPortLetterNo } from './getPortLetterNo';

export const initPortLetterTmp = (book: Workbook, contract: InnerGroupT) => {
    const phones = spsStore.confidentialPhones;
    const ws = book.getWorksheet('Port_Letter');
    const utils = initExcelUtils(ws, '');

    // prettier-ignore
    const { record: { row } } = contract;
    const { fields } = portLetterStore;

    if (!row.buyer.inn) {
        popupStore.setStatus({
            title: 'Отсутствует ИНН',
            desc: 'Проверьте наличие ИНН в справочнике',
        });
    }

    const cells: CellObjT[] = [
        { cell: 'Номер_письма', value: getPortLetterNo(contract.index) },
        { cell: 'Порт', value: `${fields.portRu.name}` },
        { cell: 'Порт_директор', value: `${fields.portRu.director}` },
        { cell: 'Порт_почта', value: `${fields.portRu.mail}` },
        {
            cell: 'Письмо_описание_шапка',
            value: `Просим вас рыбопродукцию, ${
                fields.termsPort.includes('CFR')
                    ? `которая прибудет в п. Владивосток на ${row.transport.ru.name} в адрес ООО "${row.seller.ru.name}" по следующим коносаментам:`
                    : `находящуюся на хранении ООО "${row.seller.ru.name}"`
            }`,
        },
        {
            cell: 'Письмо_описание_подвал',
            value: `передать с ${
                fields.termsPort.includes('CFR') ? 'борта судна' : 'нашего хранения'
            } компании ${row.buyer.name} ИНН ${row.buyer.inn}`,
        },
        {
            cell: 'Покупатель_телефон',
            value: `( контактный телефон ${row.buyer.phone} )`,
        },
        {
            cell: 'Грузовые_борт_склад',
            isEmpty: !fields.cargoToStorage,
            value: `Оплата грузовых работ (борт-склад) и хранения с момента закладки будет производиться за счет ${
                fields.cargoToStorage === 'Покупатель'
                    ? row.buyer.name
                    : row.seller.ru.name
            }`,
        },
        {
            cell: 'Грузовые_склад_авто',
            isEmpty: !fields.cargoToAuto,
            value: `Оплата грузовых работ (склад-авто) будет производиться за счет ${
                fields.cargoToAuto === 'Покупатель' ? row.buyer.name : row.seller.ru.name
            }`,
        },
        {
            cell: 'Хранение',
            isEmpty: fields.termsPort !== 'EXW',
            value: `Хранение стороной продавца осуществляется до ${fields.storageTo}. Хранение покупателя осуществляется с ${fields.storageFrom}`,
        },
        {
            cell: 'Телефон_представитель',
            value: `( контактный телефон: ${phones?.['ДМА']?.phone} )`,
        },
        { cell: 'Имя_представитель', value: phones?.['ДМА']?.fullName },
        {
            cell: 'Контрольный_звонок',
            isEmpty: !fields.isControlPhone,
            value: `Передача продукции по контрольному звонку: т. ${phones?.['КНФ']?.phone}, ${phones?.['МСФ']?.phone}`,
        },
        { cell: 'Подписант_комментарий', value: `${fields.podpisant.ru.position}` },
        { cell: 'Подписант', value: fields.podpisant.ru.name },
    ];

    cells.forEach((cell) => utils.setCell(cell));
    initPortLetterRows(contract, utils);

    utils.mergeFromTo([
        {
            row: {
                from: { name: 'Письмо_описание_подвал' },
                to: { name: 'Merge_end' },
            },
            cols: [{ start: 'Banner_start', end: 'Pg_end' }],
        },
    ]);
};
