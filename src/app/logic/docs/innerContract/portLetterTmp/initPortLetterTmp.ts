/* eslint-disable no-nested-ternary */
import { Workbook } from 'exceljs';
import portLetterStore from '../../../../stores/docsStores/portLetterStore';
import { CellObjT } from '../../../../types/typesExcelUtils';
import { initExcelUtils } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { ContractT } from '../groupByContractNo';
import { initPortLetterRows } from './initPortLetterRows';
import spsStore from '../../../../stores/spsStore/spsStore';

export const initPortLetterTmp = (book: Workbook, contract: ContractT) => {
    const phones = spsStore.confidentialPhones;
    const ws = book.getWorksheet('Port_Letter');
    const utils = initExcelUtils(ws, '');

    const { record, rows } = contract;
    const { fields } = portLetterStore;

    const cells: CellObjT[] = [
        { cell: 'Порт', value: `${fields.portRu.name}` },
        { cell: 'Порт_директор', value: `${fields.portRu.director}` },
        { cell: 'Порт_почта', value: `${fields.portRu.mail}` },
        {
            cell: 'Письмо_описание_шапка',
            value: `Просим вас рыбопродукцию, ${
                fields.termsPort.includes('CFR')
                    ? `которая прибудет в п. Владивосток на ${record.transport.ru.name} в адрес ${record.seller.ru.name} по следующим коносаментам:`
                    : `находящуюся на хранении ${record.seller.ru.name}`
            }`,
        },
        {
            cell: 'Письмо_описание_подвал',
            value: `передать с ${
                fields.termsPort.includes('CFR') ? 'борта судна' : 'нашего хранения'
            } компании ${record.buyer.name} ИНН ${record.buyer.inn}`,
        },
        {
            cell: 'Покупатель_телефон',
            value: `( контактный телефон ${record.buyer.phone} )`,
        },
        {
            cell: 'Грузовые_борт_склад',
            value: !fields.cargoToStorage
                ? ''
                : `Оплата грузовых работ (борт-склад) и хранения с момента закладки будет производиться за счет ${
                    fields.cargoToStorage === 'Покупатель'
                        ? record.buyer.name
                        : record.seller.ru.name
                }`,
        },
        {
            cell: 'Грузовые_склад_авто',
            value: !fields.cargoToAuto
                ? ''
                : `Оплата грузовых работ (склад-авто) будет производиться за счет ${
                    fields.cargoToAuto === 'Покупатель'
                        ? record.buyer.name
                        : record.seller.ru.name
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
        { cell: 'Письмо_дата', value: fields.dateLetter },
    ];

    initPortLetterRows(rows, utils);

    cells.forEach((cell) => utils.setCell(cell));

    const rowCargoStorage = +utils.getCell('Грузовые_борт_склад').row;
    utils.mergeCells({ row: rowCargoStorage, startCol: 1, endCol: 6 });

    const rowCargoAuto = +utils.getCell('Грузовые_склад_авто').row;
    utils.mergeCells({ row: rowCargoAuto, startCol: 1, endCol: 6 });
};
