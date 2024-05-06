import blStore from '../../../stores/docsStores/blStore';
import { ExportRowT } from '../../../stores/tablesStore/set/setExport';
import {
    initAmount,
    remainderToZero,
} from '../../../stores/tablesStore/utils/initAmount';
import { CellUtilsT } from '../../excel/utils/excelUtilsObj/initExcelUtils';
import { RowStyleSettingsT } from '../../excel/utils/styleRowCells';
import { BlGroupT } from './groupByBl';

export const initBlRows = (blGroup: BlGroupT<ExportRowT>, utils: CellUtilsT<''>) => {
    const { insertRows, insertRow, deleteStartRows } = utils.initRowMaker({
        cellName: 'Bl_массив',
    });

    const common: RowStyleSettingsT = {
        alignment: 'center',
        font: { size: 8, name: 'Arial' },
    };

    const records = blStore.isSortable
        ? blGroup.groupedBy.product
        : blGroup.groupedBy.productSort;

    insertRows({
        records,
        deleteStartAmount: 1,
        rowSettings: ({ record: r, total }) => {
            const isRoe = r.product.code.toLowerCase().includes('икра');
            const sort = isRoe || !blStore.isSortable ? '' : r.sort;

            const fields = {
                places: total.places.count,
                product: `${r.product.eng.name.toUpperCase()} ${sort}`,
                m1: '',
                m2: '',
                m3: '',
                m4: '',
                pack: r.pack,
                placesTotal: total.placesTotal.count,
                placesGross: total.placesGross.count,
            };

            const totalPlacesAmounted = remainderToZero(
                initAmount(total.placesTotal.count, 5, 7).str,
            );
            const totalGrossAmounted = remainderToZero(
                initAmount(total.placesGross.count, 5, 7).str,
            );

            return {
                fields,
                dynamicFormats: {
                    places: `# ### "${r.packSp?.type}S"`,
                    pack: `#,##0.00_) "KG/${r.packSp?.type}"`,
                    placesTotal: `#,##0.${totalPlacesAmounted}_) "MTS"`,
                    placesGross: `#,##0.${totalGrossAmounted}_) "MTS"`,
                },
                style: {
                    common,
                    special: {
                        product: { style: { alignment: { horizontal: 'left' } } },
                    },
                },
            };
        },
    });

    insertRows({ records: [[''], [''], ['']] });

    const totalPlacesAmounted = remainderToZero(
        initAmount(blGroup.total.placesTotal.count, 5, 7).str,
    );
    const totalGrossAmounted = remainderToZero(
        initAmount(blGroup.total.placesGross.count, 5, 7).str,
    );

    const totalFields = {
        e1: '',
        title: 'TOTAL',
        e2: '',
        e3: '',
        e4: '',
        e5: '',
        places: blGroup.total.places.count,
        placesTotal: blGroup.total.placesTotal.count,
        placesGross: blGroup.total.placesGross.count,
    };
    insertRow({
        fields: totalFields,
        dynamicFormats: {
            places: `# ### "${blGroup.record.packSp?.type}S"`,
            placesTotal: `#,##0.${totalPlacesAmounted}_) "MTS"`,
            placesGross: `#,##0.${totalGrossAmounted}_) "MTS"`,
        },
        style: {
            common,
            special: {
                title: { style: { alignment: { horizontal: 'left' } } },
            },
        },
    });

    deleteStartRows(6);
};
