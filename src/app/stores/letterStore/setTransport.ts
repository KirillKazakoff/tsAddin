import letterStore from './letterStore';

export const setTransport = (transportCol: any[][], dictionaryRange: any[][]) => {
    const transportMate = transportCol[1][0];
    const transport = dictionaryRange.find((row) => row[0] === transportMate);

    const [name, nameEng, id] = transport;
    letterStore.setTransport({ name, nameEng, id });
};
