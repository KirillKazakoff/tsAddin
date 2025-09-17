import { createDoc } from '../../../excel/utils/excelUtilsObj/createDoc';
import { initExcelUtils } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { getExcelDateShort } from '../../../excel/utils/getExcelDate';
import { InnerGroupT } from '../groupInnerContracts';
import { useInitInnerContract } from '../innerContract/useInitInnerContract';

const createRequest = async (invoice: InnerGroupT) => {
    await createDoc({
        fileName: `Заявка на счет ${invoice.record.row.buyer.name}`,
        initTmpsCb: async (book) => {
            const ws = book.addWorksheet('invoiceOnly');
            const { insertRows, insertRow } = initExcelUtils(ws, '').initRowMaker();

            // column width setup
            const columns = [1, 2, 3, 4, 5, 6, 7].map((index) => ws.getColumn(index));
            columns[0].width = 20;
            columns[1].width = 30;
            columns[2].width = 15;
            columns[3].width = 45;
            columns[4].width = 20;
            columns[5].width = 15;
            columns[6].width = 20;

            const r = invoice.record.row;
            const date = getExcelDateShort(r.contractDate, 'ru');

            insertRow({
                fields: { title: `ЗАЯВКА на счет от ${date}` },
                style: { common: { font: { bold: true } } },
            });

            insertRows({
                records: [
                    [`Прошу выставить счет от ${date}`],
                    [''],
                    [`между ${r.seller.orgName} (ПОСТАВЩИК) на ${r.buyer.orgNameFull}`],
                    [''],
                ],
            });

            insertRow({
                fields: [
                    'Изготовитель',
                    'Наименование',
                    'Сорт',
                    'Упаковка',
                    'Кол-во, кг',
                    'Цена, руб',
                    'Сумма, руб',
                ],
                style: {
                    common: {
                        font: { bold: true },
                        alignment: 'center',
                        border: 'all',
                    },
                },
            });

            insertRows({
                records: invoice.groupedBy.request,
                deleteStartAmount: 1,
                rowSettings: ({ record: rec, total }) => {
                    const fields = {
                        vessel: rec.row.vessel.ru.name,
                        product: rec.row.product.ru.name,
                        sort: rec.row.sort,
                        pack: rec.row.packSp.fullName,
                        placesTotal: total.placesTotal.count,
                        price: rec.row.amount.price.count,
                        priceTotal: total.priceTotal.count,
                    };

                    return {
                        fields,
                        docType: 'inner',
                        style: {
                            common: {
                                alignment: 'center',
                                height: 70,
                                border: 'all',
                            },
                        },
                    };
                },
            });

            insertRows({ records: [[''], ['']] });

            insertRow({
                fields: { title: `Сумма по договору: ${invoice.total.priceTotal.str} Р` },
                style: { common: { font: { bold: true } } },
            });
        },
    });
};

export const useInitRequest = () => {
    const { initObj: iObj } = useInitInnerContract();

    const invoicesOnly = iObj.docs.reduce<typeof iObj.docs>((invoices, contract) => {
        if (!contract.record.row.id.toString().toLowerCase().includes('счет')) return invoices;
        invoices.push(contract);

        return invoices;
    }, []);

    return {
        docs: invoicesOnly,
        onLoad: createRequest,
    };
};
