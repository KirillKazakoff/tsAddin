import { checkTable } from '../../logic/excel/checkTable/checkTable';
import { excludeOfEmptyRows } from '../../logic/excel/checkTable/excludeOfEmptyRows';
import { CertificateRowT } from '../../types/typesTables';
import { selectSp } from '../spsStore/select';
import tablesStore from './tablesStore';

export const setCertificates = (table: any[][]) => {
    table.shift();
    const excluded = excludeOfEmptyRows(table);

    const transformedTable = excluded.reduce<CertificateRowT[]>(
        (totalObj, row, index) => {
            const [
                blNo,
                agreementNo,
                contractNo,
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
                const rowObj: CertificateRowT = {
                    blNo,
                    agreementNo,
                    amount: {
                        placesRemain,
                        placesTotal,
                    },
                    seller: selectSp.seller(seller),
                    consignee: selectSp.consignee(consignee),
                    country,
                    coNo,
                    contract: selectSp.contract(contractNo),
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
