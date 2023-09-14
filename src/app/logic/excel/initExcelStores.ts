/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import excelSyncStore from '../../stores/excelSyncStore.ts/excelSyncStore';
import {
    ExcelStoresDictionaryT,
    excelStoresDictionary,
} from './excelStoresDictionary';
import { initExcelImages } from './initExcelImages';
import { initRange } from './utils/initRange';

const getExistedStores = (context: Excel.RequestContext) => {
    return Object.entries(excelStoresDictionary).reduce<ExcelStoresDictionaryT>(
        (total, [key, store]) => {
            const storeWS = context.workbook.worksheets.items.find(
                (item) => item.name === key,
            );
            const table = context.workbook.tables.items.find(
                (item) => item.name === store.table,
            );

            if (!storeWS) {
                console.warn(`В excel-книге нет Листа с названием ${key}`);
                return total;
            }
            if (!table) {
                console.error(
                    `В листе ${key} не удалось найти диапазон значений таблицы по названию ${store.table}`,
                );
                return total;
            }

            total[key] = store;
            return total;
        },
        {},
    );
};

const initStores = async (context: Excel.RequestContext) => {
    const { worksheets, tables } = context.workbook;
    context.workbook.load('tables');
    worksheets.load('items');
    tables.load('items');

    await context.sync();

    const existingStores = getExistedStores(context);

    const storeObjects = Object.entries(existingStores).map(([key, store]) => {
        return {
            range: initRange(worksheets, key, store.table),
            setter: store.setter,
        };
    });

    await context.sync();

    storeObjects.forEach((obj) => {
        if (!obj.range) return;
        obj.setter(obj.range.values);
    });
};

export const initStoresOnFilename = async (context: Excel.RequestContext) => {
    context.workbook.load('name');
    await context.sync();
    const filename = context.workbook.name.toLowerCase();

    await initStores(context);

    if (filename.includes('письмо суточные')) {
        excelSyncStore.setAppStatus('Offer');
    }
    if (filename.includes('движение продукции')) {
        await initExcelImages(context);
        excelSyncStore.setAppStatus('Docs');
    }
    if (filename.includes('продажи')) {
        excelSyncStore.setAppStatus('Sales');
    }
};
