/* eslint-disable no-param-reassign */
import { CellUtilsT } from '../../../../excel/utils/excelUtilsObj/initExcelUtils';
import { ExportGroupT } from '../../groupAgByNo';

export const initExportStorageContractRows = (
    invoices: ExportGroupT[],
    utils: CellUtilsT<string>,
) => {
    const { insertRows } = utils.initRowMaker({ cellName: 'Предмет_массив' });

    // Get product groups
    const groups = invoices.reduce<ExportGroupT[]>((total, invoice) => {
        const invoiceGroups = invoice.groupedBy.product;
        total.push(...invoiceGroups);
        return total;
    }, []);

    // table header replace
    const headersCellName = 'Контракт_предмет_заголовки';

    utils.initRowMaker({ cellName: headersCellName }).insertRow({
        fields: {
            empty1: '',
            desc: 'Продукция / Goods description',
            m1: '',
            vessel: 'Изготовитель\nFishing Vessel',
            m2: '',
            consignee: 'Получатель сертификатов / Certificates Consignee',
            m3: '',
            m4: '',
            placesTotal: 'Кол-во, тн\nQuantity, tn',
        },
        style: {
            common: {
                alignment: 'center',
                border: 'all',
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
                        border: {
                            left: null,
                            top: null,
                            bottom: null,
                        },
                        fill: {
                            pattern: 'solid',
                            fgColor: { argb: 'FFFFFFFF' },
                            bgColor: { argb: 'FFFFFFFF' },
                            type: 'pattern',
                        },
                    },
                },
            },
        },
    });

    utils.deleteRow(headersCellName);

    insertRows({
        records: groups,
        deleteStartAmount: 1,
        rowSettings: ({ record: r, total }) => {
            const fields = {
                empty1: '',
                desc: `${r.product.ru.name}\n${r.product.eng.name}`,
                m1: '',
                vessel: `${r.vessel.ru.name}\n${r.vessel.eng.name}`,
                m2: '',
                consignee: `${r.consignee.fullName}\n${r.consignee.addres}`,
                m3: '',
                m4: '',
                placesTotal: total.placesTotal.count,
            };

            // prettier-ignore
            return {
                fields,
                docType: 'exportContract',
                style: {
                    common: {
                        height: 55,
                        border: 'all',
                        alignment: 'center',
                    },
                },
            };
        },
    });
};
