import { CellUtilsT } from '../../excel/utils/excelUtilsObj/initExcelUtils';
import { getExcelDateStr } from '../../excel/utils/getExcelDate';
import { SalesGroupT } from './groupBy/groupSalesContract';

export const initSalesRowsDefault = (contract: SalesGroupT, utils: CellUtilsT<''>) => {
    const { insertRow, insertRows, deleteStartRows } = utils.initRowMaker({
        cellName: 'Контракт_предмет_массив',
    });

    // prettier-ignore
    contract.groupedBy.bl.forEach((group) => {
        const r = group.record;
        const header = {
            subject: [`- ${r.product.name}`],
            vessel: [`- ${r.vessel} via ${r.transport} (ETA ${r.port} ${getExcelDateStr(r.dateETA, 'en')})`],
            bl: [`- BL No: ${r.blNo} (Package ${r.pack} kg)`],
            titles: ['Grade', 'C/T', 'N/kg', 'Price/kg', 'Amount'],
        };

        insertRows({
            records: [header.subject, header.vessel, header.bl],
            rowSettings: (record) => ({
                fields: record,
                style: {
                    common: {
                        alignment: { horizontal: 'left' },
                        font: { name: 'Batang', size: 9, bold: true },
                    },
                },
            }),
        });

        insertRow({
            fields: header.titles,
            style: {
                common: {
                    alignment: { horizontal: 'center' },
                    font: { name: 'Batang', size: 9 },
                },
            },
        });

        insertRows({
            records: group.rows,
            rowSettings: (row) => ({
                fields: {
                    sort: row.sort,
                    places: row.amount.places.count,
                    placesTotal: row.amount.placesTotal.count,
                    price: row.amount.price.count,
                    priceTotal: row.amount.priceTotal.count,
                },
                docType: 'sales',
                style: {
                    common: {
                        alignment: 'center',
                        font: { name: 'Batang', size: 9 },
                    },
                },
            }),
        });

        const totalFields = {
            title: 'TOTAL',
            places: group.total.places.count,
            placesTotal: group.total.placesTotal.count,
            price: '-',
            priceTotal: group.total.priceTotal.count,
        };
        insertRow({
            fields: totalFields,
            docType: 'sales',
            style: {
                common: {
                    alignment: 'center',
                    font: { name: 'Batang', size: 9, bold: true },
                },
            },
        });

        insertRow({ fields: [''] });
    });

    deleteStartRows(10);
};
