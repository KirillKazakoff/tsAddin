import { BlGroupT } from '../../../types/typesContract';
import { CellUtilsT } from '../../../types/typesExcelUtils';
import { ExportRowT } from '../../../types/typesTables';
import { initRowMaker } from '../../excel/utils/excelUtilsObj/initRows';

export const initBlRows = (blGroup: BlGroupT<ExportRowT>, utils: CellUtilsT) => {
    const { groupedProductsArr: rows } = blGroup;
    const { insertRows } = initRowMaker(utils.ws, 'Bl_массив');

    insertRows({
        records: rows,
        deleteStartAmount: 1,
        rowSettings: ({ record: r, total }) => {
            const fields = {
                emptyFirst: '',
                bl: r.blNo,
                product: r.product.eng.name,
                sort: '-',
                pack: `1/${r.pack} kg`,
                places: total.places.count,
                placesTotal: total.placesTotal.count,
                placesGross: total.placesGross.count,
            };
            // prettier-ignore
            return {
                fields,
                docType: 'exportEng',
                style: {
                    common: {
                        alignment: 'center',
                        border: 'edges',
                        height: 40,
                    },
                },
            };
        },
    });
};
