import { Workbook } from 'exceljs';
import type { InnerGroupT } from '../groupByContractNo';
import type { CellObjT } from '../../../../types/typesExcelUtils';
import portLetterStore from '../../../../stores/docsStores/portLetterStore';
import { initExcelUtils } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { initPortLetterRows } from './initPortLetterRows';
import { getExcelDateNumeric, getNowDate } from '../../../excel/utils/getExcelDate';
import { indexToStr } from '../../../utils/indexToStr';

export const initPortLetterTmpFCA = (book: Workbook, contract: InnerGroupT) => {
    const ws = book.getWorksheet('Port_Letter');
    const utils = initExcelUtils(ws, '');

    // prettier-ignore
    const { record: { row, mateRow }, rows, index } = contract;
    const { fields } = portLetterStore;
    const date = { delivery: getExcelDateNumeric(row.deliveryDate, 'ru') };

    const cells: CellObjT[] = [
        {
            cell: 'Номер_письма',
            value: `Исх. №: ${mateRow?.reice} - ${indexToStr(index)} от ${
                fields.dateLetter || getNowDate()
            }`,
        },
        { cell: 'Порт', value: `${fields.portRu.name}` },
        { cell: 'Порт_директор', value: `${fields.portRu.director}` },
        { cell: 'Порт_почта', value: `${fields.portRu.mail}` },
        {
            cell: 'Письмо_описание_шапка',
            value: `Просим Вас рыбопродукцию, которая прибудет на ${row.vessel.codeName} ${date.delivery} (ориентировочно в 08:00 с уточнением) в адрес ${row.seller.ru.name}`,
        },
        {
            cell: 'Письмо_описание_подвал',
            value: 'Выгрузить на АВТО',
        },
        {
            cell: 'Расходы_компания',
            value: `Расходы по судозаходу и ПРР просьба выставлять на компанию ${row.seller.ru.name}`,
        },
        {
            cell: 'Выгрузка_ответственный1',
            value: `При выгрузке ${row.vessel.codeName} ${date.delivery} расходы по диспетчеризации и подвозу`,
        },
        {
            cell: 'Выгрузка_ответственный2',
            value: `технологического оборудования просим выставлять на ${fields.personDischarge}`,
        },

        { cell: 'Подписант_комментарий', value: fields.podpisant.ru.comment },
        { cell: 'Подписант', value: fields.podpisant.ru.name },
    ];

    initPortLetterRows(rows, utils);

    cells.forEach((cell) => utils.setCell(cell));
};
