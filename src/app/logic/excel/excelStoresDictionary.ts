/* eslint-disable quote-props */
import { setAgents } from '../../stores/spsStore/set/setAgents';
import { setBanksProdavec } from '../../stores/spsStore/set/setBanksProdavec';
import { setClientsRu } from '../../stores/spsStore/set/setClientsRu';
import { setConsignees } from '../../stores/spsStore/set/setConsignees';
import { setContracts } from '../../stores/spsStore/set/setContracts';
import { setDischargeInvoices } from '../../stores/tablesStore/set/setDischargeInvoices';
import { setPackages } from '../../stores/spsStore/set/setPackages';
import { setPodpisants } from '../../stores/spsStore/set/setPodpisants';
import { setPortsRu } from '../../stores/spsStore/set/setPortsRu';
import { setPortsTamozhnya } from '../../stores/spsStore/set/setPortsTamozhnya';
import { setPortsZarubezh } from '../../stores/spsStore/set/setPortsZarubezh';
import { setProduction } from '../../stores/spsStore/set/setProduction';
import { setSellers } from '../../stores/spsStore/set/setSellers';
import { setSortsAssortiment } from '../../stores/spsStore/set/setSortsAssortiment';
import { setStorageInvoices } from '../../stores/tablesStore/set/setStorageInvoices';
import { setTransports } from '../../stores/spsStore/set/setTransport';
import { setVessels } from '../../stores/spsStore/set/setVessels';
import { setCertificates } from '../../stores/tablesStore/set/setCertificates';
import { setExport } from '../../stores/tablesStore/set/setExport';
import { setExportStorage } from '../../stores/tablesStore/set/setExportStorage';
import { setInner } from '../../stores/tablesStore/set/setInner';
import { setMates } from '../../stores/tablesStore/set/setMates';
import { setNordmile } from '../../stores/tablesStore/set/setNordmile';
import { setSales } from '../../stores/tablesStore/set/setSales';
import { setProductionSales } from '../../stores/spsStore/set/setProductionSales';

export const excelStoresDictionary = {
    'Инвойсы хранение': {
        table: 'Инвойсы_хранение',
        setter: setStorageInvoices,
    },
    'Инвойсы выгрузка': {
        table: 'Инвойсы_выгрузка',
        setter: setDischargeInvoices,
    },
    'Транспорта': {
        table: 'SPTransport',
        setter: setTransports,
    },
    'Суда': {
        table: 'SPSudno',
        setter: setVessels,
    },
    'Продавец': {
        table: 'SPProdavec',
        setter: setSellers,
    },
    'SP_Consignee': {
        table: 'SP_Consignee',
        setter: setConsignees,
    },
    'Продукция': {
        table: 'SPProductMSC',
        setter: setProduction,
    },
    'SPPortZarubezh': {
        table: 'SPPortZarubezh',
        setter: setPortsZarubezh,
    },
    'SPTamozhnya': {
        table: 'SPTamozhnya',
        setter: setPortsTamozhnya,
    },
    'SPContract': {
        table: 'SPContract',
        setter: setContracts,
    },
    'SPPodpisant': {
        table: 'SPPodpisant',
        setter: setPodpisants,
    },
    'SPAgent': {
        table: 'SPAgent',
        setter: setAgents,
    },
    'SPRekvizitBankProdavec': {
        table: 'SPRekvizitBankProdavec',
        setter: setBanksProdavec,
    },
    'SPClientsSell': {
        table: 'SPClientsSell',
        setter: setClientsRu,
    },
    'SPPort': {
        table: 'SPPort',
        setter: setPortsRu,
    },
    'SPPackage': {
        table: 'SPPackage',
        setter: setPackages,
    },
    'SPSortAssortiment': {
        table: 'SPSortAssortiment',
        setter: setSortsAssortiment,
    },
    'SPProductionSales': {
        table: 'SPProductionSales',
        setter: setProductionSales,
    },
    // table initialize
    'Коносаменты': {
        table: 'Коносаменты',
        setter: setMates,
    },
    'Экспорт': {
        table: 'Экспорт',
        setter: setExport,
    },
    // save initialize order (Сертификаты after Экспорт Хранение);
    'Экспорт Хранение': {
        table: 'Экспорт_хранение',
        setter: setExportStorage,
    },
    'Сертификаты': {
        table: 'Сертификаты',
        setter: setCertificates,
    },
    'Внутренний рынок': {
        table: 'Продажи_ВР',
        setter: setInner,
    },
    'Продажи': {
        table: 'Sales',
        setter: setSales,
    },
    'Nordmile': {
        table: 'Nordmile',
        setter: setNordmile,
    },
};

const ESD = excelStoresDictionary;

export type ExcelStoresDictionaryT = Partial<typeof ESD>;
