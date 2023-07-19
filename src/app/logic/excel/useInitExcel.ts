import { useEffect } from 'react';
import excelSyncStore from '../../stores/excelSyncStore.ts/excelSyncStore';
import {
    excelInEditingMode,
    unknownError,
} from '../../stores/pageStatusStore.ts/pageMessages';
import pageStatusStore from '../../stores/pageStatusStore.ts/pageStatusStore';
import { addChangeHandler } from './addChangeHandler';
import { initStores } from './initStores';

export const useInitExcel = () => {
    const { statusType } = pageStatusStore.status;
    const { isSync } = excelSyncStore;

    const initExcel = async () => {
        try {
            await Excel.run(async (context) => {
                await initStores(context);
                await addChangeHandler(context);

                excelSyncStore.setSync(true);
                excelSyncStore.setLoading(false);
            });
        } catch (e) {
            const message = e.message as string;
            if (message.includes('Excel is in cell-editing mode')) {
                pageStatusStore.setPageStatus(excelInEditingMode());
            } else {
                // eslint-disable-next-line no-console
                console.log(e);
                pageStatusStore.setPageStatus(unknownError(message));
            }
        }
    };

    useEffect(() => {
        excelSyncStore.setLoading(true);
        setTimeout(() => {
            if (statusType === 'ok' || !isSync) {
                // eslint-disable-next-line no-console
                console.log('initExcel');
                initExcel();
            }
        }, 1000);
    }, [statusType, isSync]);

    return initExcel;
};
