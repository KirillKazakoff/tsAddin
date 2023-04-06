import ExcelJS from 'exceljs';
import { ExportRowT } from '../../../types/typesTables';
import { getCellByName } from '../../excel/utils/excelUtilsObj/getCellByName';
import { getExcelDateStr } from '../../excel/utils/getExcelDate';

export const initBlTmp = (book: ExcelJS.Workbook, row: ExportRowT) => {
    const blWs = book.getWorksheet('BL');
    const getCellBl: (name: string) => ExcelJS.Cell = getCellByName.bind(this, blWs);

    const sellerCl = getCellBl('Продавец');
    const sellerAdressCl = getCellBl('Продавец_адрес');
    const consigneeCl = getCellBl('Получатель');
    const consigneeAdressCl = getCellBl('Получатель_адрес');
    const dateCl = getCellBl('Дата');
    const vesselCl = getCellBl('Судно');
    const transportCl = getCellBl('Транспорт');
    const toCl = getCellBl('Куда');
    const fromCl = getCellBl('Откуда');
    const blNoCl = getCellBl('Bl');
    const productCl = getCellBl('Продукт');
    const sortCl = getCellBl('Сорт');
    const packCl = getCellBl('Упаковка');
    const amountPlacesCl = getCellBl('Места');
    const amountTotalCl = getCellBl('Всего');

    blWs.getCell(sellerCl.row, sellerCl.col);

    sellerCl.value = row.seller.nameEng;
    sellerAdressCl.value = row.seller.addresEng;

    consigneeCl.value = row.consignee.fullName;
    consigneeAdressCl.value = row.consignee.adress;

    dateCl.value = getExcelDateStr(row.date, 'eng');

    vesselCl.value = row.vessel.nameEng;

    transportCl.value = row.transport.nameEng;

    toCl.value = `${row.portTo.nameEng}, ${row.portTo.countryEng}`;

    fromCl.value = row.portFrom.nameEng;

    blNoCl.value = row.blNo;

    productCl.value = row.product.nameEng;

    sortCl.value = row.sort;
    packCl.value = `1/${row.pack} KG`;
    amountPlacesCl.value = `${row.amount.places.str} PCS /`;

    amountTotalCl.value = `${row.amount.placesTotal.str} tn`;
};
