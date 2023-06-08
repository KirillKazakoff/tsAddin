import { setPortsRu } from '../../stores/spsStore/set/setPortsRu';
import { setPortsZarubezh } from '../../stores/spsStore/set/setPortsZarubezh';
import { setProduction } from '../../stores/spsStore/set/setProduction';
import { setSellers } from '../../stores/spsStore/set/setSellers';
import { setTransports } from '../../stores/spsStore/set/setTransport';
import { setVessels } from '../../stores/spsStore/set/setVessels';
import { setMates } from '../../stores/tablesStore/setMates';
import { setNordmile } from '../../stores/tablesStore/setNordmile';
import { InitRangeBoundT, initRange as initRangeUnbound } from './utils/initRange';

export const initStoresOffer = async (context: Excel.RequestContext) => {
    const { worksheets } = context.workbook;

    const initRange: InitRangeBoundT = initRangeUnbound.bind(this, worksheets);

    const mateRange = initRange('Коносаменты', 'Коносаменты');
    const nordmileRange = initRange('Nordmile', 'Nordmile');

    const spTransportRange = initRange('Транспорта', 'SPTransport');
    const spVesselsRange = initRange('Суда', 'SPSudno');
    const spProductionRange = initRange('Продукция', 'SPProductMSC');
    const spPortsZarubezhRange = initRange('SPPortZarubezh', 'SPPortZarubezh');
    const spPortsRuRange = initRange('SPPort', 'SPPort');
    const spSellersRange = initRange('SPProdavec', 'SPProdavec');

    await context.sync();

    setVessels(spVesselsRange.values);
    setProduction(spProductionRange.values);
    setPortsZarubezh(spPortsZarubezhRange.values);
    setPortsRu(spPortsRuRange.values);
    setTransports(spTransportRange.values);
    setSellers(spSellersRange.values);

    setMates(mateRange.values);
    setNordmile(nordmileRange.values);
};
