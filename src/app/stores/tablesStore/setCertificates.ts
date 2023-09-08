/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';
import { checkTable } from '../../logic/excel/checkTable/checkTable';
import { excludeOfEmptyRows } from '../../logic/excel/checkTable/excludeOfEmptyRows';
import { CertificateRowT } from '../../types/typesTables';
import { selectSp } from '../spsStore/select';
import tablesStore from './tablesStore';
import { initAmount } from './utils/initAmount';

export const setCertificates = (table: any[][]) => {
    table.shift();
    const excluded = excludeOfEmptyRows(table);

    const transformedTable = excluded.reduce<CertificateRowT[]>(
        (totalObj, row, index) => {
            const [
                blNo,
                agreementNo,
                contractCode,
                rNo,
                seller,
                product,
                placesTotal,
                placesRemain,
                consignee,
                coNo,
                hcNo,
                iuuNo,
                country,
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
                exportRow.id = `${exportRow.id}-R${rNo}`;
                exportRow.agreementNo = `${exportRow.agreementNo}-R${rNo}` as any;
                exportRow.date = date;

                const rowObj: CertificateRowT = {
                    exportRow,
                    blNo,
                    agreementNo: `${agreementNo}-R${rNo}`,
                    amount: {
                        placesRemain,
                        placesTotal,
                    },
                    seller: selectSp.seller(seller),
                    consignee: selectSp.consignee(consignee),
                    country,
                    coNo,
                    contract: selectSp.contract(contractCode),
                    date,
                    hcNo,
                    iuuNo,
                    product: selectSp.product(product),
                    rNo,
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
