import { initAssortiment } from './initAssortiment';
import { AssortimentObjT } from './initAssortimentObj';
import { createDoc } from '../../excel/utils/excelUtilsObj/createDoc';

export const createAssortiment = async (assortiment: AssortimentObjT) => {
    await createDoc({
        fileName: `Assortment ${assortiment.record.transport.eng.name}`,
        initTmpsCb: (book) => {
            const ws = book.addWorksheet('assortiment');
            initAssortiment(assortiment, ws);
        },
    });
};
