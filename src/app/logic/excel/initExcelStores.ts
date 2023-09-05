/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import excelSyncStore from '../../stores/excelSyncStore.ts/excelSyncStore';
import {
    ExcelStoresDictionaryT,
    excelStoresDictionary,
} from './excelStoresDictionary';
import { initExcelImages } from './initExcelImages';
import { InitRangeBoundT, initRange as initRangeUnbound } from './utils/initRange';

const getExistedStores = (context: Excel.RequestContext) => {
    return Object.entries(excelStoresDictionary).reduce<ExcelStoresDictionaryT>(
        (total, [key, store]) => {
            const storeWS = context.workbook.worksheets.items.find(
                (item) => item.name === key,
            );
            if (!storeWS) {
                // eslint-disable-next-line no-console
                console.log(`В excel-книге нет Листа с названием ${key}`);
                return total;
            }

            total[key] = store;
            return total;
        },
        {},
    );
};

const initStores = async (context: Excel.RequestContext) => {
    const { worksheets } = context.workbook;
    const initRange: InitRangeBoundT = initRangeUnbound.bind(this, worksheets);
    context.workbook.load('name');
    context.workbook.worksheets.load('items');

    await context.sync();
    const existingStores = getExistedStores(context);

    // eslint-disable-next-line array-callback-return, consistent-return
    const storeObjects = Object.entries(existingStores).map(([key, store]) => {
        try {
            return {
                range: initRange(key, store.table),
                setter: store.setter,
            };
        } catch (e) {
            console.log(key);
        }
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
    const isOffer = context.workbook.name.includes('Письмо суточные');

    await initStores(context);

    if (isOffer) {
        excelSyncStore.setAppStatus('Offer');
    } else {
        await initExcelImages(context);
        excelSyncStore.setAppStatus('Docs');
    }
};
