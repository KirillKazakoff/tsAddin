/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable dot-notation */
/* eslint-disable quote-props */
import { setAgents } from '../../stores/spsStore/set/setAgents';
import { setBanksProdavec } from '../../stores/spsStore/set/setBanksProdavec';
import { setClientsRu } from '../../stores/spsStore/set/setClientsRu';
import { setConfidentialPhone } from '../../stores/spsStore/set/setConfidentialPhone';
import { setConsignees } from '../../stores/spsStore/set/setConsignees';
import { setContracts } from '../../stores/spsStore/set/setContracts';
import { setOrgForm } from '../../stores/spsStore/set/setOrgForm';
import { setPackages } from '../../stores/spsStore/set/setPackages';
import { setPodpisants } from '../../stores/spsStore/set/setPodpisants';
import { setPortsRu } from '../../stores/spsStore/set/setPortsRu';
import { setPortsTamozhnya } from '../../stores/spsStore/set/setPortsTamozhnya';
import { setPortsZarubezh } from '../../stores/spsStore/set/setPortsZarubezh';
import { setProduction } from '../../stores/spsStore/set/setProduction';
import { setProductionSales } from '../../stores/spsStore/set/setProductionSales';
import { setSellers } from '../../stores/spsStore/set/setSellers';
import { setSortsAssortiment } from '../../stores/spsStore/set/setSortsAssortiment';
import { setTransports } from '../../stores/spsStore/set/setTransport';
import { setVessels } from '../../stores/spsStore/set/setVessels';
import { setCertificates } from '../../stores/tablesStore/set/setCertificates';
import { setCustoms } from '../../stores/tablesStore/set/setCustoms';
import { setDT } from '../../stores/tablesStore/set/setDT';
import { setDischargeInvoices } from '../../stores/tablesStore/set/setDischargeInvoices';
import { setExport } from '../../stores/tablesStore/set/setExport';
import { setExportStorage } from '../../stores/tablesStore/set/setExportStorage';
import { setFescos } from '../../stores/tablesStore/set/setFescoContainers';
import { setInner } from '../../stores/tablesStore/set/setInner';
import { setMates } from '../../stores/tablesStore/set/setMates';
import { setNordmile } from '../../stores/tablesStore/set/setNordmile';
import { setSales } from '../../stores/tablesStore/set/setSales';
import { setInnerStorage } from '../../stores/tablesStore/set/setInnerStorage';
import { setStorageInvoices } from '../../stores/tablesStore/set/setStorageInvoices';

export type ExcelStoreT = {
    table: string;
    setter: (table: any[][]) => void;
    isJustRange?: boolean;
};

export const excelStoresDictionary = {
    'SPOrg': {
        table: 'SPOrg',
        setter: setOrgForm,
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
    'SPConfidentialPhone': {
        table: 'SPConfidentialPhone',
        setter: setConfidentialPhone,
    },
    // table initialize
    'Коносаменты': {
        table: 'Коносаменты',
        setter: setMates,
    },
    'Внутренний рынок': {
        table: 'Продажи_ВР',
        setter: setInner,
    },
    // save initialize order (Сертификаты after Экспорт_хранение);
    'Экспорт Хранение': {
        table: 'Экспорт_хранение',
        setter: setExportStorage,
    },
    'Сертификаты': {
        table: 'Сертификаты',
        setter: setCertificates,
    },
    'Пошлина': {
        table: 'Customs',
        setter: setCustoms,
        isJustRange: true,
    },
    'Хранение РФ': {
        table: 'Хранение_ВР',
        setter: setInnerStorage,
    },
    'Экспорт': {
        table: 'Экспорт',
        setter: setExport,
    },
    'Продажи': {
        table: 'Sales',
        setter: setSales,
    },
    'Nordmile': {
        table: 'Nordmile',
        setter: setNordmile,
    },
    'DT': {
        table: 'DT',
        setter: setDT,
    },
    'Контейнеры': {
        table: 'Контейнеры',
        setter: setFescos,
    },
    'Инвойсы хранение': {
        table: 'Инвойсы_хранение',
        setter: setStorageInvoices,
    },
    'Инвойсы выгрузка': {
        table: 'Инвойсы_выгрузка',
        setter: setDischargeInvoices,
    },
} satisfies Record<string, ExcelStoreT>;

const D = excelStoresDictionary;
export type ExcelStoresDictionaryT = Partial<typeof excelStoresDictionary>;

export const movementDictionary = {
    'SPOrg': D['SPOrg'],
    'Транспорта': D['Транспорта'],
    'Суда': D['Суда'],
    'Продавец': D['Продавец'],
    'SP_Consignee': D['SP_Consignee'],
    'Продукция': D['Продукция'],
    'SPPortZarubezh': D['SPPortZarubezh'],
    'SPTamozhnya': D['SPTamozhnya'],
    'SPContract': D['SPContract'],
    'SPPodpisant': D['SPPodpisant'],
    'SPAgent': D['SPAgent'],
    'SPRekvizitBankProdavec': D['SPRekvizitBankProdavec'],
    'SPClientsSell': D['SPClientsSell'],
    'SPPort': D['SPPort'],
    'SPPackage': D['SPPackage'],
    'SPSortAssortiment': D['SPSortAssortiment'],
    'SPConfidentialPhone': D['SPConfidentialPhone'],
    // table initialize
    'Коносаменты': D['Коносаменты'],
    'Внутренний рынок': D['Внутренний рынок'],
    // save initialize order (Сертификаты after Экспорт_хранение);
    'Экспорт Хранение': D['Экспорт Хранение'],
    'Экспорт': D['Экспорт'],
    'Пошлина': D['Пошлина'],
    'Сертификаты': D['Сертификаты'],
    'Хранение РФ': D['Хранение РФ'],
    'Контейнеры': D['Контейнеры'],
    'Инвойсы хранение': D['Инвойсы хранение'],
    'Инвойсы выгрузка': D['Инвойсы выгрузка'],
} satisfies ExcelStoresDictionaryT;

export const salesDictionary = {
    SPProductionSales: D['SPProductionSales'],
    SP_Consignee: D['SP_Consignee'],
    SPAgent: D['SPAgent'],

    Продажи: D['Продажи'],
    Суда: D['Суда'],
} satisfies ExcelStoresDictionaryT;

export const dtDictionary = {
    DT: D['DT'],
} satisfies ExcelStoresDictionaryT;
