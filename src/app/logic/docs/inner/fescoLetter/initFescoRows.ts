import { CellUtilsT } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { FescoGroupT } from './groupFesco';

export const initFescoRows = (doc: FescoGroupT, utils: CellUtilsT<''>) => {
    const { insertRows, deleteStartRows } = utils.initRowMaker({
        cellName: 'Письмо_массив',
    });

    let startMergeIndex = +utils.getCell('Письмо_массив').row;
    let lastMergeIndex = 0;

    doc.groupedBy.container.forEach((group) => {
        insertRows({
            records: group.groupedBy.productSort,
            rowSettings: ({ record: r, total }, insertIndex) => {
                lastMergeIndex = insertIndex - 1;

                const fields = {
                    no: group.index,
                    containerNo: r.id,
                    konosament: r.konosament,
                    product: `${r.product.ru.name} ${r.sort}`,
                    places: total.places.count,
                    m1: '',
                    placesTotal: total.placesTotal.count,
                };

                return {
                    fields,
                    docType: 'inner',
                    style: {
                        common: {
                            border: 'all',
                            alignment: 'center',
                            height: 15,
                        },
                    },
                };
            },
        });

        [1, 2, 3].forEach((val) => {
            utils.mergeCells({
                startCol: val,
                endCol: val,
                row: startMergeIndex,
                endRow: lastMergeIndex,
            });
        });

        startMergeIndex = lastMergeIndex + 1;
    });

    setTimeout(() => deleteStartRows(1));
};
