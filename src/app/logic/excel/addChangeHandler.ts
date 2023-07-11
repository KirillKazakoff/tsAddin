import excelSyncStore from '../../stores/excelSyncStore.ts/excelSyncStore';
import pageStatusStore from '../../stores/pageStatusStore.ts/pageStatusStore';

export const addChangeHandler = (context: Excel.RequestContext) => {
    let eventResult;
    const { worksheets } = context.workbook;

    async function remove() {
        await Excel.run(eventResult.context, async () => {
            eventResult.remove();
            await context.sync();

            eventResult = null;
        });
    }

    eventResult = worksheets.onChanged.add(async () => {
        await remove();
        pageStatusStore.resetPageStatus();

        await worksheets.context.sync();
        excelSyncStore.setSync(false);
    });
};
