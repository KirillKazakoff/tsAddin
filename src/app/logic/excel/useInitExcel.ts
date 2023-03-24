import { useEffect } from 'react';
import excelSyncStore from '../../stores/excelSyncStore.ts/excelSyncStore';
import pageStatusStore from '../../stores/pageStatusStore.ts/pageStatusStore';
import { addChangeHandler } from './addChangeHandler';
import { initStores } from './initStores';

export const useInitExcel = () => {
    const { statusType } = pageStatusStore.status;
    const { isSync } = excelSyncStore;

    const initExcel = async () => {
        try {
            await Excel.run(async (context) => {
                excelSyncStore.setLoading(true);

                addChangeHandler(context);
                await initStores(context);

                excelSyncStore.setSync(true);
                excelSyncStore.setLoading(false);
            });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (statusType === 'ok' || !isSync) {
            initExcel();
        }
    }, [statusType, isSync]);

    return initExcel;
};
