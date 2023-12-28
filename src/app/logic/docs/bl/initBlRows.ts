import { ExportRowT } from '../../../stores/tablesStore/set/setExport';
import { CellUtilsT } from '../../excel/utils/excelUtilsObj/initExcelUtils';
import { BlGroupT } from './groupByBl';

export const initBlRows = (blGroup: BlGroupT<ExportRowT>, utils: CellUtilsT<''>) => {
    const { insertRows } = utils.initRowMaker({ cellName: 'Bl_массив' });

    insertRows({
        records: blGroup.groupedBy.product,
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
