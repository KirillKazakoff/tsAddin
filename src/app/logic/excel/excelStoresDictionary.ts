/* eslint-disable @typescript-eslint/quotes */

import { setDischargeInvoices } from '../../stores/spsStore/set/setDischargeInvoices';
import { setTransports } from '../../stores/spsStore/set/setTransport';
import { setExport } from '../../stores/tablesStore/setExport';
import { setExportStorage } from '../../stores/tablesStore/setExportStorage';
import { setInner } from '../../stores/tablesStore/setInner';
import { setMates } from '../../stores/tablesStore/setMates';

type StoreObjT = {
    ws: string;
    table: string;
    setter: (values: any[][]) => void;
    range: Excel.Range;
};

export const excelStoresDictionary = {
    nonObligatory: {
        'Инвойсы выгрузка': {
            ws: 'Инвойсы выгрузка',
            table: 'Инвойсы_выгрузка',
            setter: setDischargeInvoices,
            range: {},
        },
    },
    obligatory: {
        Коносаменты: {
            ws: 'Коносаменты',
            table: 'Коносаменты',
            setter: setMates,
            range: {},
        },
        Экспорт: {
            ws: 'Экспорт',
            table: 'Экспорт',
            setter: setExport,
            range: {},
        },
        'Экспорт Хранение': {
            ws: 'Экспорт Хранение',
            table: 'Экспорт_хранение',
            setter: setExportStorage,
            range: {},
        },
        'Внутренний рынок': {
            ws: 'Внутренний рынок',
            table: 'Продажи_ВР',
            setter: setInner,
            range: {},
        },
        Транспорта: {
            ws: 'Транспорта',
            table: 'SPTransport',
            setter: setTransports,
            range: {},
        },
        Суда: {
            ws: 'Суда',
            table: 'SPSudno',
            setter: setTransports,
            range: {},
        },
    },
};
