import { Workbook } from 'exceljs';
import portLetterStore from '../../../../stores/docsStores/portLetterStore';
import { CellObjT } from '../../../../types/typesExcelUtils';
import { initExcelUtils } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { ContractT } from '../groupByContractNo';
import { initPortLetterRows } from './initPortLetterRows';

export const initPortLetterTmp = (book: Workbook, contract: ContractT) => {
    const ws = book.getWorksheet('Port_Letter');
    const utils = initExcelUtils(ws);

    const { record, rows } = contract;
    const { fields } = portLetterStore;

    const letterHeaderStr = `Просим вас рыбопродукцию, ${
        fields.termsPort.includes('CFR')
            ? `которая прибудет в п. Владивосток на ${record.transport.ru.name} в адрес ${record.seller.ru.name} по следующим коносаментам:`
            : `находящуюся на хранении ${record.seller.ru.name}`
    }`;
    const letterFooterStr = `передать с ${
        fields.termsPort.includes('CFR') ? 'борта судна' : 'нашего хранения'
    } компании ${record.buyer.name} ИНН ${record.buyer.inn}`;

    const cargoToStorageStr = `Оплата грузовых работ (борт-склад) и хранения с момента закладки будет производиться за счет ${
        fields.cargoToStorage === 'Покупатель'
            ? record.buyer.name
            : record.seller.ru.name
    }`;
    const cargoToAutoStr = `Оплата грузовых работ (склад-авто) будет производиться за счет ${
        fields.cargoToAuto === 'Покупатель'
            ? record.buyer.name
            : record.seller.ru.name
    }`;

    const storageStr = !fields.termsPort.includes('CFR')
        ? `Хранение стороной продавца осуществляется до ${fields.storageTo}. Хранение покупателя осуществляется с ${fields.storageFrom}`
        : '';

    // prettier-ignore
    const cells: CellObjT[] = [
        { cell: 'Порт', value: `${fields.portRu.name}` },
        { cell: 'Порт_директор', value: `${fields.portRu.director}` },
        { cell: 'Порт_почта', value: `${fields.portRu.mail}` },
        { cell: 'Письмо_описание_шапка', value: letterHeaderStr },
        { cell: 'Письмо_описание_подвал', value: letterFooterStr },
        { cell: 'Покупатель_телефон', value: `( контактный телефон ${record.buyer.phone} )` },
        { cell: 'Грузовые_борт_склад', value: cargoToStorageStr },
        { cell: 'Грузовые_склад_авто', value: cargoToAutoStr },
        { cell: 'Хранение', value: storageStr },
        { cell: 'Подписант_комментарий', value: fields.podpisant.ru.comment },
        { cell: 'Подписант', value: fields.podpisant.ru.name },
        { cell: 'Письмо_дата', value: fields.dateLetter },
    ];

    initPortLetterRows(rows, utils);

    cells.forEach((cell) => utils.setCell(cell));

    const rowCargoStorage = +utils.getCell('Грузовые_борт_склад').row;
    ws.unMergeCells(rowCargoStorage, 1, rowCargoStorage, 6);
    ws.mergeCells(rowCargoStorage, 1, rowCargoStorage, 6);

    const rowCargoAuto = +utils.getCell('Грузовые_склад_авто').row;
    ws.unMergeCells(rowCargoAuto, 1, rowCargoAuto, 6);
    ws.mergeCells(rowCargoAuto, 1, rowCargoAuto, 6);
};
