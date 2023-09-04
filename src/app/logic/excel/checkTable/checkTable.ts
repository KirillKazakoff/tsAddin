// import tablesStore, { TableKeyT } from '../../../stores/tablesStore/tablesStore';
// import {
//     TableErrorT,
//     initTableStatus,
//     tableError,
// } from '../../../stores/tablesStore/utils/tableStatus';
// import { CommonRowT } from '../../../types/typesTables';
// import { getNonObligatoryProps } from './getNonObligatoryProps';

// export const checkRowProps = (row: CommonRowT, tableName: TableKeyT) => {
//     const nonObligatoryProps = getNonObligatoryProps(row, tableName);

//     const keys = Object.keys(row);

//     keys.forEach((prop) => {
//         if (nonObligatoryProps.includes(prop)) return;

//         const value = row[prop];

//         if (!value) {
//             const error = tableError({
//                 row: +row.index + 1,
//                 prop,
//                 tableName,
//                 desc: 'Пустая ячейка или ошибка в БД.',
//             });
//             // console.log(error);
//             tablesStore.setStatus(error, tableName);
//         }

//         // tablesStore.setStatus(initTableStatus(), tableName);
//     });
// };

import tablesStore, { TableKeyT } from '../../../stores/tablesStore/tablesStore';
import {
    initTableStatus,
    tableError,
} from '../../../stores/tablesStore/utils/tableStatus';
import { CommonRowT } from '../../../types/typesTables';
import { getNonObligatoryProps } from './getNonObligatoryProps';

export const checkTable = (table: CommonRowT[], tableName: TableKeyT) => {
    const isError = table.some((row) => {
        const nonObligatoryProps = getNonObligatoryProps(row, tableName);

        const keys = Object.keys(row);
        const errorProp = keys.find((prop) => {
            if (nonObligatoryProps.includes(prop)) return false;

            const value = row[prop];
            if (!value) return prop;

            return false;
        });

        if (errorProp) {
            const error = tableError({
                row: +row.index + 1,
                prop: errorProp,
                tableName,
                desc: 'Пустая ячейка или ошибка в БД.',
            });
            tablesStore.setStatus(error, tableName);
            return true;
        }
        return false;
    });

    if (!isError) {
        tablesStore.setStatus(initTableStatus(), tableName);
    }
};
