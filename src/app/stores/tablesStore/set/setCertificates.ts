/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';
import { checkTable } from '../../../logic/excel/checkTable/checkTable';
import { excludeOfEmptyRows } from '../../../logic/excel/checkTable/excludeOfEmptyRows';
import { selectSp } from '../../spsStore/select';
import tablesStore from '../tablesStore';
import { initAmount } from '../utils/initAmount';
import { ExportRowT } from '../../../types/typesTables';

export const setCertificates = (table: any[][]) => {
    table.shift();
    const excluded = excludeOfEmptyRows(table);

    const transformedTable = excluded.reduce<ExportRowT[]>(
        (totalObj, row, index) => {
            const [
                blNo,
                srSuffix,
                srNo,
                agreementNo,
                contractCode,
                seller,
                product,
                placesTotal,
                consignee,
                coNo,
                hcNo,
                iuuNo,
                date,
            ] = row;

            try {
                const exportRow = _.cloneDeep(
                    tablesStore.exportStorageT.find(
                        (r) => `${r.agreementNo}${r.contract.code}${r.blNo}`
                            === `${agreementNo}${contractCode}${blNo}`,
                    ),
                );
                exportRow.amount = {
                    places: initAmount(exportRow.amount.places.count, 0, 0),
                    placesTotal: initAmount(placesTotal, 3, 4),
                    price: initAmount(exportRow.amount.price.count, 2, 2),
                    priceTotal: initAmount(exportRow.amount.priceTotal.count, 3, 4),
                };
                exportRow.id = `${exportRow.id}-${srSuffix}${srNo}`;
                exportRow.agreementNo = `${exportRow.agreementNo}-R${srNo}`;
                exportRow.date = date;
                exportRow.type = 'certificates';

                const rowObj: ExportRowT = {
                    ...exportRow,
                    seller: selectSp.seller(seller),
                    date,
                    hcNo,
                    coNo,
                    iuuNo,
                    index: index.toString(),
                };

                totalObj.push(rowObj);
                return totalObj;
            } catch (e) {
                return totalObj;
            }
        },
        [],
    );

    checkTable(transformedTable, 'certificates');
    tablesStore.setTable.certificates(transformedTable);
};
