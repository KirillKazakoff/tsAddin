import picturesStore from '../../stores/picturesStore/picturesStore';
import { setAgents } from '../../stores/spsStore/set/setAgents';
import { setBanksProdavec } from '../../stores/spsStore/set/setBanksProdavec';
import { setClientsRu } from '../../stores/spsStore/set/setClientsRu';
import { setConsignees } from '../../stores/spsStore/set/setConsignees';
import { setContracts } from '../../stores/spsStore/set/setContracts';
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
    const spBankProdavecRange = initRange(
        'SPRekvizitBankProdavec',
        'SPRekvizitBankProdavec',
    );
    const spClientsRange = initRange('SPClientsSell', 'SPClientsSell');
    const spPortsRuRange = initRange('SPPort', 'SPPort');

    const { shapes } = worksheets.getItem('Картинки');
    const pictures = Object.keys(picturesStore.pictures).map((key) => {
        return { key, base64: shapes.getItem(key).getAsImage('PNG') };
    });

    await context.sync();

    pictures.forEach((item) => picturesStore.setBase64(item.key, item.base64.value));

    setSellers(spSellersRange.values);
    setVessels(spVesselsRange.values);
    setConsignees(spConsigneesRange.values);
    setProduction(spProductionRange.values);
    setPortsZarubezh(spPortsZarubezhRange.values);
    setPortsTamozhnya(spPortsTamozhnyaRange.values);
    setContracts(spContractsRange.values);
    setPodpisants(spPodpisantsRange.values);
    setAgents(spAgentsRange.values);
    setBanksProdavec(spBankProdavecRange.values);
    setClientsRu(spClientsRange.values);
    setPortsRu(spPortsRuRange.values);

    setMates(mateRange.values);
    setExport(exportRange.values);
    setExportStorage(exportStorageRange.values);
    setInner(innerRange.values);

    setTransport(mateRange.values, spTransportRange.values);
};
