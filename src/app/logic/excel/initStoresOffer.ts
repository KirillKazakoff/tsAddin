import { setClientsRu } from '../../stores/spsStore/set/setClientsRu';
import { setPortsRu } from '../../stores/spsStore/set/setPortsRu';
import { setPortsTamozhnya } from '../../stores/spsStore/set/setPortsTamozhnya';
import { setPortsZarubezh } from '../../stores/spsStore/set/setPortsZarubezh';
import { setProduction } from '../../stores/spsStore/set/setProduction';
import { setSellers } from '../../stores/spsStore/set/setSellers';
import { setTransports } from '../../stores/spsStore/set/setTransport';
import { setVessels } from '../../stores/spsStore/set/setVessels';
import { setInner } from '../../stores/tablesStore/setInner';
import { setMates } from '../../stores/tablesStore/setMates';
import { setNordmile } from '../../stores/tablesStore/setNordmile';
import { InitRangeBoundT, initRange as initRangeUnbound } from './utils/initRange';

export const initStoresOffer = async (context: Excel.RequestContext) => {
    const { worksheets } = context.workbook;

    const initRange: InitRangeBoundT = initRangeUnbound.bind(this, worksheets);
    const innerRange = initRange('Внутренний рынок', 'Продажи_ВР');
    const mateRange = initRange('Коносаменты', 'Коносаменты');
    const nordmileRange = initRange('Nordmile', 'Nordmile');

    const spTransportRange = initRange('Транспорта', 'SPTransport');
    const spVesselsRange = initRange('Суда', 'SPSudno');
    const spProductionRange = initRange('Продукция', 'SPProductMSC');
    const spPortsZarubezhRange = initRange('SPPortZarubezh', 'SPPortZarubezh');
    const spPortsRuRange = initRange('SPPort', 'SPPort');
    const spSellersRange = initRange('SPProdavec', 'SPProdavec');
    const spClientsRange = initRange('SPClientsSell', 'SPClientsSell');
    const spPortsTamozhnyaRange = initRange('SPTamozhnya', 'SPTamozhnya');

    await context.sync();

    setVessels(spVesselsRange.values);
    setProduction(spProductionRange.values);
    setPortsZarubezh(spPortsZarubezhRange.values);
    setPortsRu(spPortsRuRange.values);
    setPortsTamozhnya(spPortsTamozhnyaRange.values);
    setTransports(spTransportRange.values);
    setSellers(spSellersRange.values);
    setClientsRu(spClientsRange.values);

    setMates(mateRange.values);
    setInner(innerRange.values);
    setNordmile(nordmileRange.values);
};
