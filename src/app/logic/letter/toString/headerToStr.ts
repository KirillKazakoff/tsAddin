import letterStore from '../../../stores/letterStore/letterStore';
import { PortZarubezhT } from '../../../types/typesSP';
import { getVesselsStrEng, getVesselsStrRu } from '../common/getFilteredVessels';

export const headerToStrRu = () => {
    const { transport } = letterStore.fields;
    const transportStr = `Продукция отгружена с ${transport.ru.name}`;
    const vesselsStr = getVesselsStrRu().join('; ');
    const greeting = 'Добрый день!';
    const info = 'Направляем информацию по новой партии продукции';

    return `${greeting}\n\n${info} ${vesselsStr}\n${transportStr}\n`;
};

export const headerToStrEng = () => {
    const { transport } = letterStore.fields;
    const port = letterStore.fields.port as PortZarubezhT;
    const vesselsStr = getVesselsStrEng().join(';  ');

    const greeting = 'Dear Sir! Good day!';
    const info = 'Send you information for new production, discharging from';

    return `${greeting}\n\n${info} ${vesselsStr} to ${port.eng.name} via ${transport.eng.name}\n`;
};
