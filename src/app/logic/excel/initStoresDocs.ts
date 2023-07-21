import { excelStoreDocs } from './excelStoresDictionary';
import { initExcelImages } from './initExcelImages';
import { InitRangeBoundT, initRange as initRangeUnbound } from './utils/initRange';

export const initStoresDocs = async (context: Excel.RequestContext) => {
    const { worksheets } = context.workbook;
    const initRange: InitRangeBoundT = initRangeUnbound.bind(this, worksheets);
    context.workbook.load('name');
    context.workbook.worksheets.load('items');
    await context.sync();

    // checkDischargeListPresence
    // let dischargeInvoicesRange: any;
    // const isDischarge = context.workbook.worksheets.items.find(
    //     (item) => item.name === 'Инвойсы выгрузка',
    // );
    // if (isDischarge) {
    //     dischargeInvoicesRange = initRange('Инвойсы выгрузка', 'Инвойсы_выгрузка');
    // }

    const storeObjects = Object.entries(excelStoreDocs).map(([key, store]) => {
        return {
            range: initRange(key, store.table),
            setter: store.setter,
        };
    });

    try {
        await context.sync();
    } catch (e) {
        console.log('heherfeffd');
    }

    storeObjects.forEach((obj) => {
        console.log(obj);
        if (!obj.range) return;
        obj.setter(obj.range.values);
    });
};
