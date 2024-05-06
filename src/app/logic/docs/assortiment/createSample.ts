import { initAssortiment } from './initAssortiment';
import { AssortimentObjT } from './initAssortimentObj';
import { createDoc } from '../../excel/utils/excelUtilsObj/createDoc';

export const createSample = async (assortiment: AssortimentObjT) => {
    await createDoc({
        fileName: `Sample plan ${assortiment.record.consignee.code}`,
        initTmpsCb: (book) => {
            const ws = book.addWorksheet('sample');
            initAssortiment(assortiment, ws);
        },
    });
};
