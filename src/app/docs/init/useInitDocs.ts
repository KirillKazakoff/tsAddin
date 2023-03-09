import { useEffect } from 'react';
import { initExport, initExportStorage, initInner } from '../../initExcel';
import { setExport } from '../../stores/tablesStore/setExport';

export const useInitDocs = () => {
    const initDocs = async () => {
        try {
            await Excel.run(async (context) => {
                const { worksheets } = context.workbook;

                const exportRange = initExport(worksheets);
                const exportStorageRange = initExportStorage(worksheets);
                const innerRange = initInner(worksheets);

                await context.sync();

                setExport(exportRange.values);
            });
        } catch (e) {
            console.log(e);
        }
    };

    const mode = process.env.NODE_ENV;

    useEffect(() => {
        if (mode === 'production') return;
        const func = async () => {
            await initDocs();
            // nextStuff()
        };
        func();
    });

    return initDocs;
};
