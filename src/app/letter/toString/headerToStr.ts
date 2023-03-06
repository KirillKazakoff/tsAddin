import letterFieldsStore from '../../stores/letterStore/letterFieldsStore';
import letterStore from '../../stores/letterStore/letterStore';
import {
    selectVesselsStr,
    selectVesselsStrEng,
} from '../../stores/letterStore/selectProductSp';

export const headerToStrRu = () => {
    const { transport } = letterStore.letter;
    const vesselsStr = selectVesselsStr().join('; ');
    const greeting = 'Добрый день!';
    const info = 'Направляем информацию по новой партии продукции';

    return `${greeting}\n\n${info} ${vesselsStr}\n${transport.name}\n`;
};

export const headerToStrEng = () => {
    const { transport } = letterStore.letter;
    const { port } = letterFieldsStore.fields;
    const vesselsStr = selectVesselsStrEng().join(';  ');

    const greeting = 'Dear Sir! Good day!';
    const info = 'Send you information for new production, discharging from';

    return `${greeting}\n\n${info} ${vesselsStr} to ${port} via ${transport.nameEng}\n`;
};
