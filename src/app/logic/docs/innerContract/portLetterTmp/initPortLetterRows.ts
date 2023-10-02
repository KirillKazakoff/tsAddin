/* eslint-disable no-param-reassign */
import portLetterStore from '../../../../stores/docsStores/portLetterStore';
import pageStatusStore from '../../../../stores/pageStatusStore.ts/pageStatusStore';
import { CellUtilsT } from '../../../../types/typesExcelUtils';
import { getExcelDateNumeric } from '../../../excel/utils/getExcelDate';
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
        const cols = {
            konosament: `${r.konosament} от ${getExcelDateNumeric(
                mateRow.date,
                'ru',
            )}`,
            product: `${r.product.ru.name} ${r.sort}`,
            vessel: r.vessel.ru.name,
            pack: `1/${r.pack}`,
            places: r.amount.places.str,
            placesTotal: r.amount.placesTotal.str,
        };

        if (portLetterStore.fields.termsPort === 'FCA') {
            delete cols.places;
            delete cols.pack;
        }

        const rowArr = Object.values(cols);

        const rowIndex = +arrayCl.row + i;
        ws.insertRow(rowIndex, rowArr).commit();

        // styleRow
        const row = ws.getRow(rowIndex);
        styleRowCells(row, {
            border: borderAll,
            alignment: alignmentCenter,
            height: 35,
        });
    });

    utils.deleteRow(cellName);
};
