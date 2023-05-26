// import { initAmount } from '../../../../../stores/tablesStore/utils/initAmount';
// import { InvoiceT } from '../../../../../types/typesContract';
// import { CellUtilsT } from '../../../../../types/typesExcelUtils';

// export const initComInvoiceFooter = (invoice: InvoiceT, utils: CellUtilsT) => {
//     if (invoice.agreement.record.terms !== 'FCA') return;

//     utils.setCell({
//         cell: 'Инвойс_подвал_всего',
//         value: `${
//             initAmount(invoice.amount.placesTotal.count * 1000, 1, 1).str
//         } kg `,
//     });

//     utils.setCell({
//         cell: 'Инвойс_подвал_всего_п',
//         value: `${initAmount(invoice.amount.placesTotal.count * 1000, 1, 1).str} кг`,
//     });
// };
