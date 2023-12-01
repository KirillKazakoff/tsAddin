/* eslint-disable no-nested-ternary */
import { Workbook } from 'exceljs';
import portLetterStore from '../../../../stores/docsStores/portLetterStore';
import { CellObjT } from '../../../../types/typesExcelUtils';
import { initExcelUtils } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { InnerGroupT } from '../groupByContractNo';
import { initPortLetterRows } from './initPortLetterRows';
import spsStore from '../../../../stores/spsStore/spsStore';
import popupStore from '../../../../stores/popupStore.ts/popupStore';

export const initPortLetterTmp = (book: Workbook, contract: InnerGroupT) => {
    const phones = spsStore.confidentialPhones;
    const ws = book.getWorksheet('Port_Letter');
    const utils = initExcelUtils(ws, '');

    // prettier-ignore
    const { record: { row }, additional: { portLetterNo } } = contract;
    const { fields } = portLetterStore;

    if (!row.buyer.inn) {
        popupStore.setStatus({
            title: 'Отсутствует ИНН',
            desc: 'Проверьте наличие ИНН в справочнике',
        });
    }

    const cells: CellObjT[] = [
        { cell: 'Номер_письма', value: portLetterNo },
        { cell: 'Порт', value: `${fields.portRu.name}` },
        { cell: 'Порт_директор', value: `${fields.portRu.director}` },
        { cell: 'Порт_почта', value: `${fields.portRu.mail}` },
        {
            cell: 'Письмо_описание_шапка',
            value: `Просим вас рыбопродукцию, ${
                fields.termsPort.includes('CFR')
                    ? `которая прибудет в п. Владивосток на ${row.transport.ru.name} в адрес ${row.seller.ru.name} по следующим коносаментам:`
                    : `находящуюся на хранении ${row.seller.ru.name}`
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
            value: !fields.cargoToStorage
                ? ''
                : `Оплата грузовых работ (борт-склад) и хранения с момента закладки будет производиться за счет ${
                    fields.cargoToStorage === 'Покупатель'
                        ? row.buyer.name
                        : row.seller.ru.name
                }`,
        },
        {
            cell: 'Грузовые_склад_авто',
            value: !fields.cargoToAuto
                ? ''
                : `Оплата грузовых работ (склад-авто) будет производиться за счет ${
                    fields.cargoToAuto === 'Покупатель'
                        ? row.buyer.name
                        : row.seller.ru.name
                }`,
        },
        {
            cell: 'Хранение',
            value: !fields.termsPort.includes('CFR')
                ? `Хранение стороной продавца осуществляется до ${fields.storageTo}. Хранение покупателя осуществляется с ${fields.storageFrom}`
                : '',
        },
        {
            cell: 'Телефон_представитель',
            value: `( контактный телефон: ${phones?.['ДМА']?.phone} )`,
        },
        { cell: 'Имя_представитель', value: phones?.['ДМА']?.fullName },
        {
            cell: 'Контрольный_звонок',
            value: fields.isControlPhone
                ? `Передача продукции по контрольному звонку: т. ${phones?.['КНФ']?.phone}, ${phones?.['МСФ']?.phone}`
                : '',
        },
        {
            cell: 'Подписант_комментарий',
            value: `${fields.podpisant.ru.position}`,
        },
        { cell: 'Подписант', value: fields.podpisant.ru.name },
    ];

    initPortLetterRows(contract, utils);

    cells.forEach((cell) => utils.setCell(cell));

    const rowCargoStorage = +utils.getCell('Грузовые_борт_склад').row;
    utils.mergeCells({ row: rowCargoStorage, startCol: 1, endCol: 6 });

    const rowCargoAuto = +utils.getCell('Грузовые_склад_авто').row;
    utils.mergeCells({ row: rowCargoAuto, startCol: 1, endCol: 6 });
};
