import excelSyncStore from '../../stores/excelSyncStore.ts/excelSyncStore';
import { initStoresDocs } from './initStoresDocs';
import { initStoresOffer } from './initStoresOffer';

export const initStores = async (context: Excel.RequestContext) => {
    context.workbook.load('name');
    await context.sync();

    const isOffer = context.workbook.name.includes('Письмо суточные');

    if (isOffer) {
        await initStoresOffer(context);
        excelSyncStore.setAppStatus('Offer');
    } else {
        await initStoresDocs(context);
        excelSyncStore.setAppStatus('Docs');
    }
};
