/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
import excelSyncStore from '../../stores/excelSyncStore.ts/excelSyncStore';
import pageStatusStore from '../../stores/pageStatusStore.ts/pageStatusStore';
import popupStore from '../../stores/popupStore.ts/popupStore';
import {
    ExcelStoresDictionaryT,
    movementDictionary,
    excelStoresDictionary,
    salesDictionary,
} from './excelStoresDictionary';
import { initExcelImages } from './initExcelImages';
import { initRange } from './utils/initRange';

const getExistedStores = async (context: Excel.RequestContext) => {
    const transformedDictionary: ExcelStoresDictionaryT = [] as any;

    let stores = excelStoresDictionary as ExcelStoresDictionaryT;
    if (excelSyncStore.appStatus === 'Docs') {
        stores = movementDictionary;
    }
    if (excelSyncStore.appStatus === 'Sales') {
        stores = salesDictionary;
    }
    if (excelSyncStore.appStatus === 'DT') {
        stores = [] as any;
    }

    for await (const [key, store] of Object.entries(stores)) {
        const storeWS = context.workbook.worksheets.items.find(
            (item) => item.name === key,
        );
        const table = context.workbook.tables.items.find(
            (item) => item.name === store.table,
        );

        if (!storeWS) {
            popupStore.pushStatus({
                title: 'Отсутствует справочник',
                desc: `В excel-книге нет Листа с названием ${key}`,
            });
            continue;
        }

        if (!table) {
            try {
                const range = context.workbook.worksheets
                    .getItem(key)
                    .getRange(store.table);
                range.load('values');

                await context.sync();

                if (!range) throw new Error('no range');
            } catch (e) {
                popupStore.pushStatus({
                    title: `Неверное наименование ${key}`,
                    desc: `В листе ${key} не удалось найти диапазон значений по названию ${store.table}`,
                });
                continue;
            }
        }

        transformedDictionary[key] = store;
    }

    return transformedDictionary;
};

const initStores = async (context: Excel.RequestContext) => {
    const { worksheets, tables } = context.workbook;
    context.workbook.load('tables');
    worksheets.load('items');
    tables.load('items');

    await context.sync();

    const existingStores = await getExistedStores(context);

    const storeObjects = Object.entries(existingStores).map(([key, store]) => {
        return {
            range: initRange(worksheets, key, store),
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
    try {
        context.workbook.load('name');
        await context.sync();
        const fileName = context.workbook.name.toLowerCase();

        if (fileName.includes('письмо заявки')) {
            excelSyncStore.setAppStatus('Offer');
        } else if (fileName.includes('движение')) {
            excelSyncStore.setAppStatus('Docs');
        } else if (fileName.includes('дт_таблица')) {
            excelSyncStore.setAppStatus('DT');
        } else if (fileName.includes('продажи')) {
            excelSyncStore.setAppStatus('Sales');
        } else {
            pageStatusStore.setPageStatus('noRouteMatchFileName', fileName);
        }

        await initStores(context);
        await initExcelImages(context);
    } catch (e) {
        popupStore.pushStatus({ title: 'Неизвестная ошибка', desc: `error${e}` });
    }
};
