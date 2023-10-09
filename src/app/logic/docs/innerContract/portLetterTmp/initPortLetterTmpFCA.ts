import { Workbook } from 'exceljs';
import { ContractT } from '../groupByContractNo';
import portLetterStore from '../../../../stores/docsStores/portLetterStore';
import { initExcelUtils } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { CellObjT } from '../../../../types/typesExcelUtils';
import { initPortLetterRows } from './initPortLetterRows';
import { getExcelDateNumeric } from '../../../excel/utils/getExcelDate';

export const initPortLetterTmpFCA = (book: Workbook, contract: ContractT) => {
    const ws = book.getWorksheet('Port_Letter');
    const utils = initExcelUtils(ws);

    const { record, rows } = contract;
    const { fields } = portLetterStore;
    const date = { delivery: getExcelDateNumeric(record.deliveryDate, 'ru') };

    const cells: CellObjT[] = [
        { cell: 'Порт', value: `${fields.portRu.name}` },
        { cell: 'Порт_директор', value: `${fields.portRu.director}` },
        { cell: 'Порт_почта', value: `${fields.portRu.mail}` },
        {
            cell: 'Письмо_описание_шапка',
            value: `Просим Вас рыбопродукцию, которая прибудет на ${record.vessel.codeName} ${date.delivery} (ориентировочно в 08:00 с уточнением) в адрес ${record.seller.ru.name}`,
        },
        {
            cell: 'Письмо_описание_подвал',
            value: 'Выгрузить на АВТО',
        },
        {
            cell: 'Расходы_компания',
            value: `Расходы по судозаходу и ПРР просьба выставлять на компанию ${record.seller.ru.name}`,
        },
        {
            cell: 'Выгрузка_ответственный1',
            value: `При выгрузке ${record.vessel.codeName} ${date.delivery} расходы по диспетчеризации и подвозу`,
        },
        {
            cell: 'Выгрузка_ответственный2',
            value: `технологического оборудования просим выставлять на ${fields.personDischarge}`,
        },

        { cell: 'Подписант_комментарий', value: fields.podpisant.ru.comment },
        { cell: 'Подписант', value: fields.podpisant.ru.name },
        { cell: 'Письмо_дата', value: fields.dateLetter },
    ];

    initPortLetterRows(rows, utils);

    cells.forEach((cell) => utils.setCell(cell));
};
