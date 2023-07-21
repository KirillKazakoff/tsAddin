/* eslint-disable no-param-reassign */
import excelSyncStore from '../../stores/excelSyncStore.ts/excelSyncStore';
import {
    ExcelStoresDictionaryT,
    excelStoreDocs,
    excelStoreOffer,
} from './excelStoresDictionary';
import { initExcelImages } from './initExcelImages';
import { InitRangeBoundT, initRange as initRangeUnbound } from './utils/initRange';

const getExistedStores = (
    stores: ExcelStoresDictionaryT,
    context: Excel.RequestContext,
) => {
    return Object.entries(stores).reduce<ExcelStoresDictionaryT>(
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

const initStoresCb = async (
    context: Excel.RequestContext,
    excelStores: ExcelStoresDictionaryT,
) => {
    const { worksheets } = context.workbook;
    const initRange: InitRangeBoundT = initRangeUnbound.bind(this, worksheets);
    context.workbook.load('name');
    context.workbook.worksheets.load('items');

    await context.sync();
    const existingStores = getExistedStores(excelStores, context);

    const storeObjects = Object.entries(existingStores).map(([key, store]) => {
        return {
            range: initRange(key, store.table),
            setter: store.setter,
        };
    });

    await context.sync();

    storeObjects.forEach((obj) => {
        if (!obj.range) return;
        obj.setter(obj.range.values);
    });
};

export const initStores = async (context: Excel.RequestContext) => {
    context.workbook.load('name');
    await context.sync();
    const isOffer = context.workbook.name.includes('Письмо суточные');

    if (isOffer) {
        await initStoresCb(context, excelStoreOffer);
        excelSyncStore.setAppStatus('Offer');
    } else {
        await initExcelImages(context);
        await initStoresCb(context, excelStoreDocs);
        excelSyncStore.setAppStatus('Docs');
    }
};
