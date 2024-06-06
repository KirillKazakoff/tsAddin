import { CellUtilsT } from '../../../../excel/utils/excelUtilsObj/initExcelUtils';
import { ExportGroupT } from '../../groupAgByNo';

export const initExportDefaultContractRowsFCA = (
    invoices: ExportGroupT[],
    utils: CellUtilsT<string>,
) => {
    const { insertRows } = utils.initRowMaker({ cellName: 'Предмет_массив' });

    // Get product groups
    const invoicesArr = Object.values(invoices);
    const groups = invoicesArr.reduce<ExportGroupT[]>((total, invoice) => {
        const invoiceGroups = invoice.groupedBy.product;
        total.push(...invoiceGroups);
        return total;
    }, []);

    // headers remove
    const headersCellName = 'Контракт_предмет_заголовки';

    utils.initRowMaker({ cellName: headersCellName }).insertRow({
        fields: {
            empty1: '',
            desc: 'Продукция\nGoods description',
            m1: '',
            m2: '',
            m3: '',
            vessel: 'Изготовитель\nFishing Vessel',
            m4: '',
            price: 'Цена, $/тн\nPrice,$/тн',
            placesTotal: 'Кол-во, тн\nQuantity, tn',
        },
        style: {
            common: {
                alignment: 'center',
                border: 'outside',
                fill: {
                    pattern: 'solid',
                    fgColor: { argb: 'FFDCDCDC' },
                    bgColor: { argb: 'FFDCDCDC' },
                    type: 'pattern',
                },
            },
            special: {
                empty1: {
                    style: {
                        fill: {
                            pattern: 'solid',
                            fgColor: { argb: 'FFFFFFFF' },
                            bgColor: { argb: 'FFFFFFFF' },
                            type: 'pattern',
                        },
                    },
                },
                vessel: {
                    style: {
                        border: { left: { style: 'thin' } },
                    },
                },
            },
        },
    });

    utils.deleteRow(headersCellName);

    // insert table rows
    insertRows({
        records: groups,
        deleteStartAmount: 1,
        rowSettings: ({ record: r, total }) => {
            const fields = {
                empty1: '',
                product: `${r.product.ru.name}\n${r.product.eng.name}`,
                m1: '',
                m2: '',
                m3: '',
                vessel: `${r.vessel.ru.name}\n${r.vessel.eng.name}`,
                m4: '',
                price: r.amount.price.count,
                placesTotal: total.placesTotal.count,
            };

            // prettier-ignore
            return {
                fields,
                docType: 'exportContract',
                style: {
                    common: {
                        height: 55,
                        border: 'outside',
                        alignment: 'center',
                        font: { size: 10 },
                    },
                    special: {
                        vessel: {
                            style: { border: { left: { style: 'thin' } } },
                        },
                    },
                },
            };
        },
    });
};
