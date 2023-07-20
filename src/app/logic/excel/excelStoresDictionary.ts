/* eslint-disable @typescript-eslint/quotes */

import { setDischargeInvoices } from '../../stores/spsStore/set/setDischargeInvoices';
import { setTransports } from '../../stores/spsStore/set/setTransport';
import { setExport } from '../../stores/tablesStore/setExport';
import { setExportStorage } from '../../stores/tablesStore/setExportStorage';
import { setInner } from '../../stores/tablesStore/setInner';
import { setMates } from '../../stores/tablesStore/setMates';

export const excelStoresDictionary = {
    'Инвойсы выгрузка': {
        ws: 'Инвойсы выгрузка',
        table: 'Инвойсы_выгрузка',
        setter: setDischargeInvoices,
    },
    Коносаменты: {
        ws: 'Коносаменты',
        table: 'Коносаменты',
        setter: setMates,
    },
    Экспорт: {
        ws: 'Экспорт',
        table: 'Экспорт',
        setter: setExport,
    },
    'Экспорт Хранение': {
        ws: 'Экспорт Хранение',
        table: 'Экспорт_хранение',
        setter: setExportStorage,
    },
    'Внутренний рынок': {
        ws: 'Внутренний рынок',
        table: 'Продажи_ВР',
        setter: setInner,
    },
    Транспорта: {
        ws: 'Транспорта',
        table: 'SPTransport',
        setter: setTransports,
    },
    Суда: {
        ws: 'Суда',
        table: 'SPSudno',
        setter: setTransports,
    },
};

export const excelStoresDictionary2 = {
    nonObligatory: {
        'Инвойсы выгрузка': {
            ws: 'Инвойсы выгрузка',
            table: 'Инвойсы_выгрузка',
            setter: setDischargeInvoices,
        },
    },
    obligatory: {
        Коносаменты: {
            ws: 'Коносаменты',
            table: 'Коносаменты',
            setter: setMates,
        },
        Экспорт: {
            ws: 'Экспорт',
            table: 'Экспорт',
            setter: setExport,
        },
        'Экспорт Хранение': {
            ws: 'Экспорт Хранение',
            table: 'Экспорт_хранение',
            setter: setExportStorage,
        },
        'Внутренний рынок': {
            ws: 'Внутренний рынок',
            table: 'Продажи_ВР',
            setter: setInner,
        },
        Транспорта: {
            ws: 'Транспорта',
            table: 'SPTransport',
            setter: setTransports,
        },
        Суда: {
            ws: 'Суда',
            table: 'SPSudno',
            setter: setTransports,
        },
    },
};

// concept init stores

// const storeObjects = Object.values(excelStoresDictionary.obligatory).map((obj) => {
//     return {
//         range: initRange('worksheets' as any, obj.ws, obj.table),
//         setter: obj.setter,
//     }
// });

// await context.sync();

// storeObjects.forEach((obj) => {
//     if (!obj.range) return;
//     obj.setter(obj.range.values);
// });
