import { setPortsRu } from '../../stores/spsStore/set/setPortsRu';
import { setPortsZarubezh } from '../../stores/spsStore/set/setPortsZarubezh';
import { setProduction } from '../../stores/spsStore/set/setProduction';
import { setTransport } from '../../stores/spsStore/set/setTransport';
import { setVessels } from '../../stores/spsStore/set/setVessels';
import { setMates } from '../../stores/tablesStore/setMates';
import { InitRangeBoundT, initRange as initRangeUnbound } from './utils/initRange';

export const initStoresOffer = async (context: Excel.RequestContext) => {
    const { worksheets } = context.workbook;

    const initRange: InitRangeBoundT = initRangeUnbound.bind(this, worksheets);

    const mateRange = initRange('Коносаменты', 'Коносаменты');
    const spTransportRange = initRange('Транспорта', 'SPTransport');
    const spVesselsRange = initRange('Суда', 'SPSudno');
    const spProductionRange = initRange('Продукция', 'SPProductMSC');
    const spPortsZarubezhRange = initRange('SPPortZarubezh', 'SPPortZarubezh');
    const spPortsRuRange = initRange('SPPort', 'SPPort');

    await context.sync();

    setVessels(spVesselsRange.values);
    setProduction(spProductionRange.values);
    setPortsZarubezh(spPortsZarubezhRange.values);
    setPortsRu(spPortsRuRange.values);

    setMates(mateRange.values);
    setTransport(mateRange.values, spTransportRange.values);
};
