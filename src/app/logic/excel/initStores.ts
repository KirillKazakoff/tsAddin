import { setAgents } from '../../stores/spsStore/set/setAgents';
import { setBanksProdavec } from '../../stores/spsStore/set/setBanksProdavec';
import { setClientsRu } from '../../stores/spsStore/set/setClientsRu';
import { setConsignees } from '../../stores/spsStore/set/setConsignees';
import { setContracts } from '../../stores/spsStore/set/setContracts';
import { setPodpisants } from '../../stores/spsStore/set/setPodpisants';
import { setPortsTamozhnya } from '../../stores/spsStore/set/setPortsTamozhnya';
import { setPortsZarubezh } from '../../stores/spsStore/set/setPortsZarubezh';
import { setProduction } from '../../stores/spsStore/set/setProduction';
import { setSellers } from '../../stores/spsStore/set/setSeller';
import { setTransport } from '../../stores/spsStore/set/setTransport';
import { setVessels } from '../../stores/spsStore/set/setVessels';
import { setExport } from '../../stores/tablesStore/setExport';
import { setExportStorage } from '../../stores/tablesStore/setExportStorage';
import { setMate } from '../../stores/tablesStore/setMate';
import { InitRangeBoundT, initRange as initRangeUnbound } from './utils/initRange';

export const initStores = async (context: Excel.RequestContext) => {
    const { worksheets } = context.workbook;
    const initRange: InitRangeBoundT = initRangeUnbound.bind(this, worksheets);

    const mateRange = initRange('Коносаменты', 'Коносаменты');
    const exportRange = initRange('Экспорт', 'Экспорт');
    const exportStorageRange = initRange('Экспорт Хранение', 'Экспорт_хранение');
    const innerRange = initRange('Внутренний рынок', 'Продажи_ВР');

    const spTransportRange = initRange('Транспорта', 'SPTransport');
    const spVesselsRange = initRange('Суда', 'SPSudno');
    const spSellersRange = initRange('Продавец', 'SPProdavec');
    const spConsigneesRange = initRange('SP_Consignee', 'SP_Consignee');
    const spProductionRange = initRange('Продукция', 'SPProductMSC');
    const spPortsZarubezhRange = initRange('SPPortZarubezh', 'SPPortZarubezh');
    const spPortsTamozhnyaRange = initRange('SPTamozhnya', 'SPTamozhnya');
    const spContractsRange = initRange('SPContract', 'SPContract');
    const spPodpisantsRange = initRange('SPPodpisant', 'SPPodpisant');
    const spAgentsRange = initRange('SPAgent', 'SPAgent');
    const spBankProdavec = initRange(
        'SPRekvizitBankProdavec',
        'SPRekvizitBankProdavec',
    );
    const spClientsRange = initRange('SPClientsSell', 'SPClientsSell');

    await context.sync();

    setMate(mateRange.values);

    setSellers(spSellersRange.values);
    setTransport(mateRange.values, spTransportRange.values);
    setVessels(spVesselsRange.values);
    setConsignees(spConsigneesRange.values);
    setProduction(spProductionRange.values);
    setPortsZarubezh(spPortsZarubezhRange.values);
    setPortsTamozhnya(spPortsTamozhnyaRange.values);
    setContracts(spContractsRange.values);
    setPodpisants(spPodpisantsRange.values);
    setAgents(spAgentsRange.values);
    setBanksProdavec(spBankProdavec.values);
    setClientsRu(spClientsRange.values);

    setExport(exportRange.values);
    setExportStorage(exportStorageRange.values);
};
