/* eslint-disable max-len */
import { ExportInitRowT } from '../../../types/typesTables';
import { getExportRow } from '../getExportRow';
import { setTable } from './setTable';

export const setExportStorage = (table: any[][]) => {
    setTable({
        table,
        type: 'exportStorage',
        row: (r) => {
            const [
                contract,
                seller,
                agent,
                vessel,
                transport,
                agreementNo,
                invoice,
                date,
                blMode,
                blNo,
                msc,
                product,
                sort,
                pack,
                places,
                placesTotal,
                price,
                priceTotal,
                portTo,
                operationUseless,
                id,
                consignee,
                portFrom,
                placesLeft,
                datePusan,
                dateClose,
            ] = r;

            const rowInit: ExportInitRowT = {
                contract,
                seller,
                agent,
                vessel,
                transport,
                agreementNo,
                invoice,
                date,
                blMode,
                blNo,
                portFrom,
                portTo,
                consignee,
                msc,
                product,
                sort,
                pack,
                places,
                placesTotal,
                price,
                priceTotal,
                id,
                placesLeft,
                datePusan,
                dateClose,
                terms: 'EXW',
            };

            return getExportRow(rowInit);
        },
    });
};
