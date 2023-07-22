/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable dot-notation */
/* eslint-disable quote-props */
import { setAgents } from '../../stores/spsStore/set/setAgents';
import { setBanksProdavec } from '../../stores/spsStore/set/setBanksProdavec';
import { setClientsRu } from '../../stores/spsStore/set/setClientsRu';
import { setConsignees } from '../../stores/spsStore/set/setConsignees';
import { setContracts } from '../../stores/spsStore/set/setContracts';
import { setDischargeInvoices } from '../../stores/spsStore/set/setDischargeInvoices';
import { setPackages } from '../../stores/spsStore/set/setPackages';
import { setPodpisants } from '../../stores/spsStore/set/setPodpisants';
import { setPortsRu } from '../../stores/spsStore/set/setPortsRu';
import { setPortsTamozhnya } from '../../stores/spsStore/set/setPortsTamozhnya';
import { setPortsZarubezh } from '../../stores/spsStore/set/setPortsZarubezh';
import { setProduction } from '../../stores/spsStore/set/setProduction';
import { setSellers } from '../../stores/spsStore/set/setSellers';
import { setSortsAssortiment } from '../../stores/spsStore/set/setSortsAssortiment';
import { setTransports } from '../../stores/spsStore/set/setTransport';
import { setVessels } from '../../stores/spsStore/set/setVessels';
import { setExport } from '../../stores/tablesStore/setExport';
import { setExportStorage } from '../../stores/tablesStore/setExportStorage';
import { setInner } from '../../stores/tablesStore/setInner';
import { setMates } from '../../stores/tablesStore/setMates';
import { setNordmile } from '../../stores/tablesStore/setNordmile';

const excelStoresDictionary = {
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
    'Коносаменты': {
        table: 'Коносаменты',
        setter: setMates,
    },
    'Экспорт': {
        table: 'Экспорт',
        setter: setExport,
    },
    'Экспорт Хранение': {
        table: 'Экспорт_хранение',
        setter: setExportStorage,
    },
    'Внутренний рынок': {
        table: 'Продажи_ВР',
        setter: setInner,
    },
    'Nordmile': {
        table: 'Nordmile',
        setter: setNordmile,
    },
};

const ESD = excelStoresDictionary;

export type ExcelStoresDictionaryT = Partial<typeof ESD>;

// two stores initialize desc objects - for offer and docs add-in versions;
// first goes sp dictionaries and then tables with data itself
export const excelStoreOffer: ExcelStoresDictionaryT = {
    'Транспорта': ESD['Транспорта'],
    'Суда': ESD['Суда'],
    'Продукция': ESD['Продукция'],
    'SPPortZarubezh': ESD['SPPortZarubezh'],
    'SPPort': ESD['SPPort'],
    'Продавец': ESD['Продавец'],
    'SPClientsSell': ESD['SPClientsSell'],
    'SPTamozhnya': ESD['SPTamozhnya'],
    'Внутренний рынок': ESD['Внутренний рынок'],
    'Коносаменты': ESD['Коносаменты'],
    'Nordmile': ESD['Nordmile'],
};

export const excelStoreDocs: ExcelStoresDictionaryT = {
    'Транспорта': ESD['Транспорта'],
    'Суда': ESD['Суда'],
    'Продавец': ESD['Продавец'],
    'SP_Consignee': ESD['SP_Consignee'],
    'Продукция': ESD['Продукция'],
    'SPPortZarubezh': ESD['SPPortZarubezh'],
    'SPTamozhnya': ESD['SPTamozhnya'],
    'SPContract': ESD['SPContract'],
    'SPPodpisant': ESD['SPPodpisant'],
    'SPAgent': ESD['SPAgent'],
    'SPRekvizitBankProdavec': ESD['SPRekvizitBankProdavec'],
    'SPClientsSell': ESD['SPClientsSell'],
    'SPPort': ESD['SPPort'],
    'SPPackage': ESD['SPPackage'],
    'SPSortAssortiment': ESD['SPSortAssortiment'],
    'Коносаменты': ESD['Коносаменты'],
    'Экспорт': ESD['Экспорт'],
    'Экспорт Хранение': ESD['Экспорт Хранение'],
    'Внутренний рынок': ESD['Внутренний рынок'],
    'Инвойсы выгрузка': ESD['Инвойсы выгрузка'],
};
