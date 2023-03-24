import { setConsignees } from '../../stores/spsStore/set/setConsignees';
import { setContracts } from '../../stores/spsStore/set/setContracts';
import { setPortsTamozhnya } from '../../stores/spsStore/set/setPortsTamozhnya';
import { setPortsZarubezh } from '../../stores/spsStore/set/setPortsZarubezh';
import { setProduction } from '../../stores/spsStore/set/setProduction';
import { setSellers } from '../../stores/spsStore/set/setSeller';
import { setTransport } from '../../stores/spsStore/set/setTransport';
import { setVessels } from '../../stores/spsStore/set/setVessels';
import { setExport } from '../../stores/tablesStore/setExport';
import { setExportStorage } from '../../stores/tablesStore/setExportStorage';
import { setMate } from '../../stores/tablesStore/setMate';
import { initRange as initRangeUnbound, InitRangeBoundT } from './initRange';

export const initStores = async (context: Excel.RequestContext) => {
    const { worksheets } = context.workbook;
    const initRange: InitRangeBoundT = initRangeUnbound.bind(this, worksheets);

    const mateRange = initRange('Коносаменты', 'Коносаменты');
    const exportRange = initRange('Экспорт', 'Экспорт');
    const exportStorageRange = initRange('Экспорт Хранение', 'Экспорт_хранение');
    const innerRange = initRange('Внутренний рынок', 'Продажи_ВР');

    const spTransportRange = initRange('Транспорта', 'SPTransport');
    const spVesselsRange = initRange('Суда', 'SPSudno');
    const spSellerRange = initRange('Продукция', 'SPProductMSC');
    const spConsigneeRange = initRange('Продавец', 'SPProdavec');
    const spProductionRange = initRange('SP_Consignee', 'SP_Consignee');
    const spPortZarubezhRange = initRange('SPPortZarubezh', 'SPPortZarubezh');
    const spPortTamozhnyaRange = initRange('SPTamozhnya', 'SPTamozhnya');
    const spContractRange = initRange('SPContract', 'SPContract');

    await context.sync();

    setMate(mateRange.values);
    setExport(exportRange.values);
    setExportStorage(exportStorageRange.values);

    setSellers(spSellerRange.values);
    setTransport(mateRange.values, spTransportRange.values);
    setVessels(spVesselsRange.values);
    setConsignees(spConsigneeRange.values);
    setProduction(spProductionRange.values);
    setPortsZarubezh(spPortZarubezhRange.values);
    setPortsTamozhnya(spPortTamozhnyaRange.values);
    setContracts(spContractRange.values);
};
