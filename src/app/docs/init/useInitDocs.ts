import { initExport, initExportStorage, initInner } from '../../initExcel';

export const useInitDocs = () => {
    const initDocs = async () => {
        await Excel.run(async (context) => {
            const { worksheets } = context.workbook;
            const exportRange = initExport(worksheets);
            const exportStorageRange = initExportStorage(worksheets);
            const innerRange = initInner(worksheets);

            await context.sync();
        });
    };
};
