import { checkRowProps } from '../../logic/excel/checkTable/checkRowProps';
import { excludeOfEmptyRows } from '../../logic/excel/checkTable/excludeOfEmptyRows';
import { CertificateRowT } from '../../types/typesTables';
import { selectSp } from '../spsStore/select';

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

            checkRowProps(rowObj, 'Certificates');

            totalObj.push(rowObj);
            return totalObj;
        },
        [],
    );
};
