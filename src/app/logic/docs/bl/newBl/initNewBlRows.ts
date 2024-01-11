import { ExportRowT } from '../../../../stores/tablesStore/set/setExport';
import { CellUtilsT } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { BlGroupT } from '../groupByBl';

export const initNewBlRows = (blGroup: BlGroupT<ExportRowT>, utils: CellUtilsT<''>) => {
    const { insertRows, insertRow } = utils.initRowMaker({ cellName: 'Bl_массив' });

    insertRows({
        records: blGroup.groupedBy.product,
        deleteStartAmount: 1,
        rowSettings: ({ record: r, total }) => {
            const fields = {
                places: total.places.count,
                product: r.product.eng.name,
                m1: '',
                m2: '',
                m3: '',
                m4: '',
                pack: r.pack,
                placesTotal: total.placesTotal.count,
                placesGross: total.placesGross.count,
            };

            return {
                fields,
                docType: 'bl',
                style: {
                    common: {
                        alignment: 'center',
                    },
                },
            };
        },
    });

    // insertRow
};
