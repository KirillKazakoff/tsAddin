import exportContractStore from '../../../../stores/docsStores/exportContractStore';
import { ExportRowT } from '../../../../stores/tablesStore/set/setExport';
import { CellUtilsT } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { RowStyleSettingsT } from '../../../excel/utils/styleRowCells';
import { BlGroupT } from '../groupByBl';

export const initNewBlRows = (blGroup: BlGroupT<ExportRowT>, utils: CellUtilsT<''>) => {
    exportContractStore.setCurrentId(blGroup.record.id);
    const { insertRows, insertRow, deleteStartRows } = utils.initRowMaker({
        cellName: 'Bl_массив',
    });

    const common: RowStyleSettingsT = {
        alignment: 'center',
        font: { size: 8, name: 'Arial' },
    };

    insertRows({
        records: blGroup.groupedBy.product,
        deleteStartAmount: 1,
        rowSettings: ({ record: r, total }) => {
            const fields = {
                places: total.places.count,
                product: r.product.eng.name.toUpperCase(),
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
                    common,
                    special: {
                        product: { style: { alignment: { horizontal: 'left' } } },
                    },
                },
            };
        },
    });

    insertRows({ records: [[''], [''], ['']] });

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
        docType: 'bl',
        style: {
            common,
            special: {
                title: { style: { alignment: { horizontal: 'left' } } },
            },
        },
    });

    deleteStartRows(6);
};
