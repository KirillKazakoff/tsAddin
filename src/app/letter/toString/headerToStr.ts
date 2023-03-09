import letterStore from '../../stores/letterStore/letterStore';

import { selectVesselsStr, selectVesselsStrEng } from '../../stores/spsStore/select';
import spsStore from '../../stores/spsStore/spsStore';

export const headerToStrRu = () => {
    const { transport } = spsStore;
    const vesselsStr = selectVesselsStr().join('; ');
    const greeting = 'Добрый день!';
    const info = 'Направляем информацию по новой партии продукции';

    return `${greeting}\n\n${info} ${vesselsStr}\n${transport.name}\n`;
};

export const headerToStrEng = () => {
    const { transport } = spsStore;
    const { port } = letterStore.fields;
    const vesselsStr = selectVesselsStrEng().join(';  ');

    const greeting = 'Dear Sir! Good day!';
    const info = 'Send you information for new production, discharging from';

    return `${greeting}\n\n${info} ${vesselsStr} to ${port} via ${transport.nameEng}\n`;
};
