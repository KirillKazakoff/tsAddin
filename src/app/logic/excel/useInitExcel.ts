import { useEffect } from 'react';
import excelChangesStore from '../../stores/excelSyncStore.ts/excelSyncStore';
import pageStatusStore from '../../stores/pageStatusStore.ts/pageStatusStore';
import { setConsignees } from '../../stores/spsStore/set/setConsignees';
import { setPortsTamozhnya } from '../../stores/spsStore/set/setPortsTamozhnya';
import { setPortsZarubezh } from '../../stores/spsStore/set/setPortsZarubezh';
import { setProduction } from '../../stores/spsStore/set/setProduction';
import { setSellers } from '../../stores/spsStore/set/setSeller';
import { setTransport } from '../../stores/spsStore/set/setTransport';
import { setVessels } from '../../stores/spsStore/set/setVessels';
import { setExport } from '../../stores/tablesStore/setExport';
import { setExportStorage } from '../../stores/tablesStore/setExportStorage';
import { setMate } from '../../stores/tablesStore/setMate';
import tablesStore from '../../stores/tablesStore/tablesStore';
import { addChangeHandler } from './addChangeHandler';

import {
    initMate,
    initExport,
    initExportStorage,
    initInner,
    initTransport,
    initVessels,
    initSeller,
    initConsignee,
    initProduction,
    initPortZarubezh,
    initPortTamozhnya,
} from './initRanges';

export const useInitExcel = () => {
    const { statusType } = pageStatusStore.status;
    const { isSync } = excelChangesStore;

    const initExcel = async () => {
        try {
            await Excel.run(async (context) => {
                const { worksheets } = context.workbook;

                addChangeHandler(context);
                const mateRange = initMate(worksheets);
                const exportRange = initExport(worksheets);
                const exportStorageRange = initExportStorage(worksheets);
                const innerRange = initInner(worksheets);

                const spTransportRange = initTransport(worksheets);
                const spVesselsRange = initVessels(worksheets);
                const spSellerRange = initSeller(worksheets);
                const spConsigneeRange = initConsignee(worksheets);
                const spProductionRange = initProduction(worksheets);
                const SPPortZarubezhRange = initPortZarubezh(worksheets);
                const SPPortTamozhnyaRange = initPortTamozhnya(worksheets);

                await context.sync();

                setMate(mateRange.values);
                setExport(exportRange.values);
                setExportStorage(exportStorageRange.values);

                setSellers(spSellerRange.values);
                setTransport(mateRange.values, spTransportRange.values);
                setVessels(spVesselsRange.values);
                setConsignees(spConsigneeRange.values);
                setProduction(spProductionRange.values);
                setPortsZarubezh(SPPortZarubezhRange.values);
                setPortsTamozhnya(SPPortTamozhnyaRange.values);

                excelChangesStore.setSync(true);
            });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (statusType === 'ok' || !isSync) {
            initExcel();
        }
    }, [statusType, isSync]);

    return initExcel;
};
