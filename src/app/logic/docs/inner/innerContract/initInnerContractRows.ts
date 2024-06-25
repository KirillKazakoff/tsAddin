import { CellUtilsT } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { RowStyleSettingsT } from '../../../excel/utils/styleRowCells';
import { InnerGroupT } from '../groupInnerContracts';

export const initInnerContractRows = (contract: InnerGroupT, utils: CellUtilsT<''>) => {
    const { insertRows: insertSubject } = utils.initRowMaker({
        cellName: 'Договор_предмет_массив',
    });

    const common: RowStyleSettingsT = {
        alignment: 'center',
        border: 'edges',
        height: 30,
        font: { name: 'Times New Roman', size: 10 },
    };

    insertSubject({
        headers: ({ record: r }) => ({
            pack: r.row.product.code.toLowerCase().includes('живой')
                ? 'Категория'
                : 'Упаковка',
        }),
        records: contract.groupedBy.sortPack,
        deleteStartAmount: 2,
        rowSettings: ({ record: { row: r }, total }) => {
            const fields = {
                empty1: '',
                product: r.product.ru.name,
                m1: '',
                vessel: r.vessel.ru.name,
                m2: '',
                sort: r.sort,
                pack: r.packSp?.fullName || '-',
                placesTotal: total.placesTotal.count,
                m3: '',
            };

            return {
                fields,
                docType: 'inner',
                style: {
                    common,
                    special: {
                        placesTotal: { style: { border: { right: { style: 'thin' } } } },
                    },
                },
            };
        },
    });

    const { insertRows: insertCost } = utils.initRowMaker({
        cellName: 'Договор_цена_массив',
    });

    insertCost({
        mergeHeader: true,
        headers: ({ record: r }) => ({
            pack: r.row.product.code.toLowerCase().includes('живой')
                ? 'Категория'
                : 'Упаковка',
        }),
        records: contract.groupedBy.sortPack,
        deleteStartAmount: 2,
        rowSettings: ({ record: { row: r } }) => {
            const fields = {
                empty1: '',
                product: r.product.ru.name,
                m1: '',
                vessel: r.vessel.ru.name,
                m2: '',
                sort: r.sort,
                pack: r.packSp?.fullName || '-',
                price: r.amount.price.count,
                nds: r.product.nds,
            };

            return {
                fields,
                docType: 'inner',
                style: { common },
            };
        },
    });
};
