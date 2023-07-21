/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/quotes */
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
    Транспорта: {
        table: 'SPTransport',
        setter: setTransports,
    },
    Суда: {
        table: 'SPSudno',
        setter: setVessels,
    },
    Продавец: {
        table: 'SPProdavec',
        setter: setSellers,
    },
    SP_Consignee: {
        table: 'SP_Consignee',
        setter: setConsignees,
    },
    Продукция: {
        table: 'SPProductMSC',
        setter: setProduction,
    },
    SPPortZarubezh: {
        table: 'SPPortZarubezh',
        setter: setPortsZarubezh,
    },
    SPTamozhnya: {
        table: 'SPTamozhnya',
        setter: setPortsTamozhnya,
    },
    SPContract: {
        table: 'SPContract',
        setter: setContracts,
    },
    SPPodpisant: {
        table: 'SPPodpisant',
        setter: setPodpisants,
    },
    SPAgent: {
        table: 'SPAgent',
        setter: setAgents,
    },
    SPRekvizitBankProdavec: {
        table: 'SPRekvizitBankProdavec',
        setter: setBanksProdavec,
    },
    SPClientsSell: {
        table: 'SPClientsSell',
        setter: setClientsRu,
    },
    SPPort: {
        table: 'SPPort',
        setter: setPortsRu,
    },
    SPPackage: {
        table: 'SPPackage',
        setter: setPackages,
    },
    SPSortAssortiment: {
        table: 'SPSortAssortiment',
        setter: setSortsAssortiment,
    },
    Коносаменты: {
        table: 'Коносаменты',
        setter: setMates,
    },
    Экспорт: {
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
    Nordmile: {
        table: 'Nordmile',
        setter: setNordmile,
    },
};

const d = excelStoresDictionary;

// prettier-ignore
export const excelStoresNonObligatory = [
    d['Инвойсы выгрузка'],
];

export const excelStoreOffer = {
    Транспорта: d['Транспорта'],
    Суда: d['Суда'],
    Продукция: d['Продукция'],
    SPPortZarubezh: d['SPPortZarubezh'],
    SPPort: d['SPPort'],
    Продавец: d['Продавец'],
    SPClientsSell: d['SPClientsSell'],
    SPTamozhnya: d['SPTamozhnya'],
    'Внутренний рынок': d['Внутренний рынок'],
    Коносаменты: d['Коносаменты'],
    Nordmile: d['Nordmile'],
};

export const excelStoreDocs = { ...excelStoresDictionary };
delete excelStoreDocs.Nordmile;
delete excelStoreDocs['Инвойсы выгрузка'];

export type ExcelStoreT = {
    [key: string]: {
        table: string;
        setter: (values: any[][]) => void;
    };
};
