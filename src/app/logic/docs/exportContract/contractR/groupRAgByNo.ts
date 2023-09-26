// import tablesStore from '../../../../stores/tablesStore/tablesStore';
// import { groupify } from '../../../utils/groupify';
// import { groupByBl } from '../groupBy/groupByBl';
// import { RAgreementT, RAgreementsT, initRAgreement } from './initRAgreement';

// export const groupRAgByNo = () => {
//     const table = tablesStore.certificatesT;

//     const agreements = table.reduce<RAgreementsT>((total, row) => {
//         const agreement = groupify<RAgreementT>(total, initRAgreement(row), row.id);

//         agreement.rows.push(row);
//         agreement.priceTotal += row.amount.priceTotal.count;
//         return total;
//     }, {});

//     Object.entries(agreements).forEach(([key, agreement]) => {
//         agreements[key].rowsGroupedBy.bl = groupByBl(agreement.rows);
//     });

//     return Object.values(agreements);
// };
