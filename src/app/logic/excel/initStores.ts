import excelSyncStore from '../../stores/excelSyncStore.ts/excelSyncStore';
import {
    ExcelStoreT,
    excelStoreDocs,
    excelStoreOffer,
} from './excelStoresDictionary';
import { initExcelImages } from './initExcelImages';
import { InitRangeBoundT, initRange as initRangeUnbound } from './utils/initRange';

const initStoresCb = async (
    context: Excel.RequestContext,
    excelStores: ExcelStoreT,
) => {
    const { worksheets } = context.workbook;
    const initRange: InitRangeBoundT = initRangeUnbound.bind(this, worksheets);
    context.workbook.load('name');
    context.workbook.worksheets.load('items');
    await context.sync();

    const storeObjects = Object.entries(excelStores).map(([key, store]) => {
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
        // await initStoresOffer(context);
        await initStoresCb(context, excelStoreOffer);
        excelSyncStore.setAppStatus('Offer');
    } else {
        await initExcelImages(context);
        await initStoresCb(context, excelStoreDocs);
        // await initStoresDocs(context);
        excelSyncStore.setAppStatus('Docs');
    }
};

// checkDischargeListPresence
// let dischargeInvoicesRange: any;
// const isDischarge = context.workbook.worksheets.items.find(
//     (item) => item.name === 'Инвойсы выгрузка',
// );
// if (isDischarge) {
//     dischargeInvoicesRange = initRange('Инвойсы выгрузка', 'Инвойсы_выгрузка');
// }
