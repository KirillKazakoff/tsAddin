/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import ExcelJS from 'exceljs';
import _ from 'lodash';
import { getCellByName } from '../../utils/getCellByName';
import { ExportRowT } from '../../types/typesTables';
import { selectSellerSp, selectConsigneeSp } from '../../stores/spsStore/select';

export const initBlTemplate = (book: ExcelJS.Workbook, row: ExportRowT) => {
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

    const sellerSp = selectSellerSp(row.seller);
    sellerCl.value = sellerSp.nameEng;
    sellerAdressCl.value = sellerSp.addresEng;

    const consigneeSp = selectConsigneeSp(row.consignee);
    consigneeCl.value = consigneeSp.fullName;
    consigneeAdressCl.value = consigneeSp.adress;

    dateCl.value = row.date;
    vesselCl.value = row.vessel;
    transportCl.value = row.transport;

    toCl.value = row.portTo;
    fromCl.value = row.portFrom;

    blNoCl.value = row.blNo;
    productCl.value = row.product;
    sortCl.value = row.sort;
    packCl.value = row.pack;
    amountPlacesCl.value = row.amountPlaces;
    amountTotalCl.value = row.amountTotal;
};
