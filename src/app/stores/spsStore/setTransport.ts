import spsStore from './spsStore';

export const setTransport = (mateValues: any[][], dictionaryRange: any[][]) => {
    // get transport cell from first table row
    const transportMate = mateValues[1][4];
    const transport = dictionaryRange.find((row) => row[0] === transportMate);

    const [name, nameEng, id] = transport;
    spsStore.setTransport({ name, nameEng, id });
};
