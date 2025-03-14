import offerStore from '../../../stores/mailStores/offerStore';
import { PortZarubezhT } from '../../../stores/spsStore/set/setPortsZarubezh';
import { getVesselsStrEng, getVesselsStrRu } from '../common/getFilteredVessels';

export const headerToStrRu = () => {
    const transportStr = `Продукция отгружена с ${offerStore.transport.ru.name}`;
    const vesselsStr = getVesselsStrRu().join('; ');
    const greeting = 'Добрый день!';
    const info = 'Направляем информацию по новой партии продукции';

    return `${greeting}\n\n${info} ${vesselsStr}\n${transportStr}\n`;
};

export const headerToStrEng = () => {
    const port = offerStore.fields.port as PortZarubezhT;
    const vesselsStr = getVesselsStrEng().join(';  ');

    const greeting = 'Dear Sir! Good day!';
    const info = 'Send you information for new production, discharging from';

    return `${greeting}\n\n${info} ${vesselsStr} to ${port.eng.name} via ${offerStore.transport.eng.name}\n`;
};
