/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import excelSyncStore from '../../stores/excelSyncStore.ts/excelSyncStore';
import { noRouteMatchFileName } from '../../stores/pageStatusStore.ts/pageMessages';
import pageStatusStore from '../../stores/pageStatusStore.ts/pageStatusStore';
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
                // console.warn(`В excel-книге нет Листа с названием ${key}`);
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

export const initStoresOnFileName = async (context: Excel.RequestContext) => {
    context.workbook.load('name');
    await context.sync();
    const fileName = context.workbook.name.toLowerCase();
    console.log(fileName);

    await initStores(context);
    await initExcelImages(context);

    if (fileName.includes('письмо заявки')) {
        excelSyncStore.setAppStatus('Offer');
        return;
    }
    if (fileName.includes('движение')) {
        excelSyncStore.setAppStatus('Docs');
        return;
    }
    if (fileName.includes('продажи')) {
        excelSyncStore.setAppStatus('Sales');
        return;
    }

    pageStatusStore.setPageStatus(noRouteMatchFileName(fileName));
};
