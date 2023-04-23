import { checkEmptyTable } from '../../../logic/excel/utils/checkTable';
import { transportNotFound } from '../../pageStatusStore.ts/pageMessages';
import pageStatusStore from '../../pageStatusStore.ts/pageStatusStore';
import spsStore from '../spsStore';

export const setTransport = (mateValues: any[][], dictionaryRange: any[][]) => {
    const isEmptyMates = checkEmptyTable(mateValues);
    if (isEmptyMates) return;

    // get transport cell from first table row
    const transportMate = mateValues[0][4];
    const transport = dictionaryRange.find((row) => row[0] === transportMate);
    if (!transport) {
        pageStatusStore.setPageStatus(transportNotFound());
    }

    const [nameRu, nameEng, id] = transport;
    spsStore.setSp.transport({ eng: { name: nameEng }, ru: { name: nameRu }, id });
};
