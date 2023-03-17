import excelChangesStore from '../../stores/excelSyncStore.ts/excelSyncStore';

export const initRange = (
    worksheets: Excel.WorksheetCollection,
    wsName: string,
    tableName: string,
) => {
    const ws = worksheets.getItem(wsName);
    const tableSrc = ws.tables.getItem(tableName);

    const handler = async () => {
        await Excel.run(async (context) => {
            await context.sync();
            excelChangesStore.setSync(false);

            console.log(tableName);
        });
    };

    tableSrc.onChanged.remove(handler);
    tableSrc.onChanged.add(handler);

    const range = tableSrc.getRange();

    range.load('values');
    return range;
};
