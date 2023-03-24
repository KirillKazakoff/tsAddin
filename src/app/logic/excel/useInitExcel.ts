import { useEffect } from 'react';
import excelChangesStore from '../../stores/excelSyncStore.ts/excelSyncStore';
import pageStatusStore from '../../stores/pageStatusStore.ts/pageStatusStore';
import { addChangeHandler } from './addChangeHandler';
import { initStores } from './initStores';

export const useInitExcel = () => {
    const { statusType } = pageStatusStore.status;
    const { isSync } = excelChangesStore;

    const initExcel = async () => {
        try {
            await Excel.run(async (context) => {
                addChangeHandler(context);
                await initStores(context);
                excelChangesStore.setSync(true);
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
