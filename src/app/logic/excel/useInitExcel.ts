import { useEffect } from 'react';
import excelSyncStore from '../../stores/excelSyncStore.ts/excelSyncStore';
import pageStatusStore from '../../stores/pageStatusStore.ts/pageStatusStore';
import { addChangeHandler } from './addChangeHandler';
import { initStoresOnFileName } from './initExcelStores';
import popupStore from '../../stores/popupStore.ts/popupStore';

export const useInitExcel = () => {
    const { statusType } = pageStatusStore.status;
    const { isSync } = excelSyncStore;

    const initExcel = async () => {
        try {
            await Excel.run(async (context) => {
                await initStoresOnFileName(context);
                await addChangeHandler(context);

                excelSyncStore.setSync(true);
                excelSyncStore.setLoading(false);
            });
        } catch (e) {
            const message = e.message as string;
            if (message.includes('Excel is in cell-editing mode')) {
                pageStatusStore.setPageStatus('excelInEditingMode');
            } else {
                // eslint-disable-next-line no-console
                console.error(e);
                pageStatusStore.setPageStatus('unknownError', message);
            }
        }
    };

    useEffect(() => {
        excelSyncStore.setLoading(true);
        setTimeout(() => {
            if (statusType === 'ok' || !isSync) {
                console.log('initExcel');
                popupStore.setActive(false);
                initExcel();
            }
        }, 1000);
    }, [statusType, isSync]);

    return initExcel;
};
