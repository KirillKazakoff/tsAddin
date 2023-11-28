/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';
import { selectSp } from '../../spsStore/select';
import tablesStore from '../tablesStore';
import { initAmount } from '../utils/initAmount';
import { ExportRowT } from '../../../types/typesTables';
import { setTable } from './setTable';

export const setCertificates = (table: any[][]) => {
    setTable<ExportRowT>({
        table,
        type: 'certificates',
        row: (r) => {
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
            ] = r;

            const exportRow = _.cloneDeep(
                tablesStore.exportStorageT.find(
                    (eRow) => `${eRow.agreementNo}${eRow.contract.code}${eRow.blNo}`
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

            return {
                ...exportRow,
                seller: selectSp.seller(seller),
                date,
                hcNo,
                coNo,
                iuuNo,
            };
        },
    });
};
