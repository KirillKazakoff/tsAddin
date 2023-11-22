import { ExportRowT } from '../../../types/typesTables';
import { CellUtilsT } from '../../excel/utils/excelUtilsObj/initExcelUtils';
import { BlGroupT } from '../exportContract/groupBy/groupByBl';

export const initBlRows = (blGroup: BlGroupT<ExportRowT>, utils: CellUtilsT<''>) => {
    const { insertRows } = utils.initRowMaker({ cellName: 'Bl_массив' });

    insertRows({
        records: blGroup.rows,
        deleteStartAmount: 1,
        rowSettings: (r) => {
            const fields = {
                emptyFirst: '',
                bl: r.blNo,
                product: r.product.eng.name,
                sort: '-',
                pack: `1/${r.pack} kg`,
                places: blGroup.total.places.count,
                placesTotal: blGroup.total.placesTotal.count,
                placesGross: blGroup.total.placesGross.count,
            };

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
