import ExcelJS from 'exceljs';
import {
    selectSellerSp,
    selectConsigneeSp,
    selectVesselSp,
    selectTransportSp,
    selectPortZarubezhSp,
    selectPortTamozhnyaSp,
    selectProductSp,
} from '../../../stores/spsStore/select';
import { ExportRowT } from '../../../types/typesTables';
import { formatCount } from '../../utils/formatCount';
import { getCellByName } from '../../excel/getCellByName';
import { getExcelDate } from '../../excel/getExcelDate';

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

    const consigneeSp = selectConsigneeSp(row.consignee || row.buyer);
    consigneeCl.value = consigneeSp.fullName;
    consigneeAdressCl.value = consigneeSp.adress;

    dateCl.value = getExcelDate(row.date).toLocaleString('eng', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const vesselSp = selectVesselSp(row.vessel);
    vesselCl.value = vesselSp.nameEng;

    const transportSp = selectTransportSp();
    transportCl.value = transportSp.nameEng;

    const portZarubezhSp = selectPortZarubezhSp(row.portTo);
    toCl.value = portZarubezhSp.nameEng;

    const portTamozhnyaSp = selectPortTamozhnyaSp(row.portFrom);
    fromCl.value = portTamozhnyaSp.nameEng;

    blNoCl.value = row.blNo;

    const productSp = selectProductSp(row.product);
    productCl.value = productSp.nameEng;

    sortCl.value = row.sort;
    packCl.value = `${row.pack} KG`;
    amountPlacesCl.value = `${formatCount(row.amountPlaces)} PCS`;

    amountTotalCl.value = `${formatCount(row.amountTotal.toFixed(3))} tn`;
};