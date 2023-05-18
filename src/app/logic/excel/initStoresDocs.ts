import { setAgents } from '../../stores/spsStore/set/setAgents';
import { setBanksProdavec } from '../../stores/spsStore/set/setBanksProdavec';
import { setClientsRu } from '../../stores/spsStore/set/setClientsRu';
import { setConsignees } from '../../stores/spsStore/set/setConsignees';
import { setContracts } from '../../stores/spsStore/set/setContracts';
import { setPackages } from '../../stores/spsStore/set/setPackages';
import { setPodpisants } from '../../stores/spsStore/set/setPodpisants';
import { setPortsRu } from '../../stores/spsStore/set/setPortsRu';
import { setPortsTamozhnya } from '../../stores/spsStore/set/setPortsTamozhnya';
import { setPortsZarubezh } from '../../stores/spsStore/set/setPortsZarubezh';
import { setProduction } from '../../stores/spsStore/set/setProduction';
import { setSellers } from '../../stores/spsStore/set/setSellers';
import { setTransport } from '../../stores/spsStore/set/setTransport';
import { setVessels } from '../../stores/spsStore/set/setVessels';
import { setExport } from '../../stores/tablesStore/setExport';
import { setExportStorage } from '../../stores/tablesStore/setExportStorage';
import { setInner } from '../../stores/tablesStore/setInner';
import { setMates } from '../../stores/tablesStore/setMates';
import { initExcelImages } from './initExcelImages';
import { InitRangeBoundT, initRange as initRangeUnbound } from './utils/initRange';

export const initStoresDocs = async (context: Excel.RequestContext) => {
    const { worksheets } = context.workbook;
    context.workbook.load('name');
    await context.sync();

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
    const spBankProdavecRange = initRange(
        'SPRekvizitBankProdavec',
        'SPRekvizitBankProdavec',
    );
    const spClientsRange = initRange('SPClientsSell', 'SPClientsSell');
    const spPortsRuRange = initRange('SPPort', 'SPPort');
    const spPackageRange = initRange('SPPackage', 'SPPackage');

    await initExcelImages(context);
    context.workbook.load('name');
    await context.sync();

    setSellers(spSellersRange.values);
    setConsignees(spConsigneesRange.values);
    setPortsTamozhnya(spPortsTamozhnyaRange.values);
    setContracts(spContractsRange.values);
    setPodpisants(spPodpisantsRange.values);
    setAgents(spAgentsRange.values);
    setBanksProdavec(spBankProdavecRange.values);
    setClientsRu(spClientsRange.values);
    setVessels(spVesselsRange.values);
    setProduction(spProductionRange.values);
    setPortsZarubezh(spPortsZarubezhRange.values);
    setPortsRu(spPortsRuRange.values);
    setPackages(spPackageRange.values);
    setTransport(mateRange.values, spTransportRange.values);

    setExport(exportRange.values);
    setExportStorage(exportStorageRange.values);
    setInner(innerRange.values);
    setMates(mateRange.values);
};
