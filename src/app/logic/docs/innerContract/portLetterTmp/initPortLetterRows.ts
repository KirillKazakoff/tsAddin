/* eslint-disable no-param-reassign */
import portLetterStore from '../../../../stores/docsStores/portLetterStore';
import pageStatusStore from '../../../../stores/pageStatusStore.ts/pageStatusStore';
import { CellUtilsT } from '../../../../types/typesExcelUtils';
import { getExcelDateNumeric } from '../../../excel/utils/getExcelDate';
import { setFormats } from '../../../utils/formats';
import { alignmentCenter, borderAll, styleRowCells } from '../../styleRowCells';
import { ContractRowT } from '../groupByContractNo';

export const initPortLetterRows = (rows: ContractRowT[], utils: CellUtilsT) => {
    const { ws } = utils;
    const cellName = 'Письмо_массив';
    const arrayCl = utils.getCell(cellName);

    rows.forEach(({ row: r, mateRow }, i) => {
        const date = mateRow?.date;
        if (!date) {
            pageStatusStore.setPageStatus('mismatchKonosamentId', r.konosament);
            return;
        }
        const fields = {
            konosament: `${r.konosament} от ${getExcelDateNumeric(
                mateRow.date,
                'ru',
            )}`,
            product: `${r.product.ru.name} ${r.sort}`,
            vessel: r.vessel.ru.name,
            pack: `1/${r.pack}`,
            places: r.amount.places.count,
            placesTotal: r.amount.placesTotal.count,
        };

        if (portLetterStore.fields.termsPort === 'FCA') {
            delete fields.places;
            delete fields.pack;
        }

        const rowIndex = +arrayCl.row + i;
        const row = ws.insertRow(rowIndex, Object.values(fields));
        setFormats(row, fields, 'inner');

        // styleRow
        styleRowCells(row, {
            border: borderAll,
            alignment: alignmentCenter,
            height: 35,
        });
    });

    utils.deleteRow(cellName);
};
