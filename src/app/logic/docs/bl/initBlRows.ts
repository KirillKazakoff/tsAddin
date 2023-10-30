import { ExportRowT } from '../../../types/typesTables';
import { CellUtilsT } from '../../excel/utils/excelUtilsObj/initExcelUtils';
import { BlGroupT } from '../exportContract/groupBy/initBlGroup';

export const initBlRows = (blGroup: BlGroupT<ExportRowT>, utils: CellUtilsT<''>) => {
    const { groupedProductsArr: rows } = blGroup;
    const { insertRows } = utils.initRowMaker({ cellName: 'Bl_массив' });

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
