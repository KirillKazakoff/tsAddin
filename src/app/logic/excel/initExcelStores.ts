/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import excelSyncStore from '../../stores/excelSyncStore.ts/excelSyncStore';
import pageStatusStore from '../../stores/pageStatusStore.ts/pageStatusStore';
import popupStore from '../../stores/popupStore.ts/popupStore';
import { ExcelStoresDictionaryT, excelStoresDictionary } from './excelStoresDictionary';
import { initExcelImages } from './initExcelImages';
import { initRange } from './utils/initRange';

const getExistedStores = async (context: Excel.RequestContext) => {
    const transformedDictionary: ExcelStoresDictionaryT = [] as any;

    for await (const [key, store] of Object.entries(excelStoresDictionary)) {
        console.log(key);
        const storeWS = context.workbook.worksheets.items.find(
            (item) => item.name === key,
        );
        const table = context.workbook.tables.items.find(
            (item) => item.name === store.table,
        );

        if (!storeWS) {
            console.warn(`В excel-книге нет Листа с названием ${key}`);
            continue;
        }

        if (!table) {
            if (key === 'Экспорт') {
                console.log('hello');
            }
            try {
                const range = context.workbook.worksheets
                    .getItem(key)
                    .getRange(store.table);
                range.load('values');

                await context.sync();

                if (!range) throw new Error();
            } catch (e) {
                popupStore.setStatus({
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
    context.workbook.load('name');
    await context.sync();
    const fileName = context.workbook.name.toLowerCase();

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

    pageStatusStore.setPageStatus('noRouteMatchFileName', fileName);
};
