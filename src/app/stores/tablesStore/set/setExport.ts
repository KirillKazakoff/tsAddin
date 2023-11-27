import { ExportInitRowT } from '../../../types/typesTables';
import { getExportRow } from '../getExportRow';
import { setTable } from './setTable';

/* eslint-disable max-len */
export const setExport = (table: any[][]) => {
    table.shift();

    setTable({
        table,
        type: 'export',
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
                portFrom,
                terms,
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
                terms,
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
            };

            return getExportRow(rowInit);
        },
    });
};
