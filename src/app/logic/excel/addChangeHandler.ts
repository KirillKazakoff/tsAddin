import excelChangesStore from '../../stores/excelSyncStore.ts/excelSyncStore';
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

    eventResult = worksheets.onChanged.add(async (e) => {
        await remove();
        pageStatusStore.resetPageStatus();

        const ws = worksheets.getItem(e.worksheetId);
        ws.load('name');
        await worksheets.context.sync();
        excelChangesStore.setSync(false);

        console.log(ws.name);
    });
};
