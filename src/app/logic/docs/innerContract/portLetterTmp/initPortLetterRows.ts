/* eslint-disable no-param-reassign */
import portLetterStore from '../../../../stores/docsStores/portLetterStore';
import pageStatusStore from '../../../../stores/pageStatusStore.ts/pageStatusStore';
import { CellUtilsT } from '../../../../types/typesExcelUtils';
import { initRowMaker } from '../../../excel/utils/excelUtilsObj/initRows';
import { getExcelDateNumeric } from '../../../excel/utils/getExcelDate';
import { borderAll, alignmentCenter } from '../../../excel/utils/styleRowCells';
import { ContractRowT } from '../groupByContractNo';

export const initPortLetterRows = (rows: ContractRowT[], utils: CellUtilsT) => {
    const { insertRows } = initRowMaker(utils.ws, 'Письмо_массив');

    insertRows({
        records: rows,
        deleteStartAmount: 1,
        rowSettings: ({ row: r, mateRow }) => {
            const date = mateRow?.date;
            if (!date) {
                pageStatusStore.setPageStatus('mismatchKonosamentId', r.konosament);
                return null;
            }
            // prettier-ignore
            const fields = {
                konosament: `${r.konosament} от ${getExcelDateNumeric(mateRow.date, 'ru')}`,
                product: `${r.product.ru.name} ${r.sort}`,
                vessel: r.vessel.ru.name,
                pack: `1/${r.pack} кг`,
                places: r.amount.places.count,
                placesTotal: r.amount.placesTotal.count,
            };

            if (portLetterStore.fields.termsPort === 'FCA') {
                delete fields.places;
                delete fields.pack;
            }

            return {
                fields,
                docType: 'inner',
                style: {
                    common: {
                        border: borderAll,
                        alignment: alignmentCenter,
                        height: 35,
                    },
                },
            };
        },
    });
};
