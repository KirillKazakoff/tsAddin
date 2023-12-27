// sp - dictionary (spravochnik)
import { makeAutoObservable } from 'mobx';
import { Dictionary as D } from '../../types/typesUtils';
import type { AgentT } from './set/setAgents';
import type { BankProdavecT } from './set/setBanksProdavec';
import type { TransportT } from './set/setTransport';
import type { VesselT } from './set/setVessels';
import type { ClientRuT } from './set/setClientsRu';
import type { ConfidentialPhoneT } from './set/setConfidentialPhone';
import type { ConsigneeT } from './set/setConsignees';
import type { ContractT } from './set/setContracts';
import type { OrgFormT } from './set/setOrgForm';
import type { PackageT } from './set/setPackages';
import type { PodpisantT } from './set/setPodpisants';
import type { PortRuT } from './set/setPortsRu';
import type { PortTamozhnyaT } from './set/setPortsTamozhnya';
import type { PortZarubezhT } from './set/setPortsZarubezh';
import type { ProductionT } from './set/setProduction';
import type { ProductionSalesT } from './set/setProductionSales';
import type { SellerT } from './set/setSellers';
import type { SortAssortimentT } from './set/setSortsAssortiment';

class SpsStore {
    transports: D<TransportT> = {};
    vessels: D<VesselT> = {};
    production: D<ProductionT> = {};
    packages: D<PackageT> = {};
    sellers: D<SellerT> = {};
    consignees: D<ConsigneeT> = {};
    portsTamozhnya: D<PortTamozhnyaT> = {};
    portsZarubezh: D<PortZarubezhT> = {};
    contracts: D<ContractT> = {};
    podpisants: D<PodpisantT> = {};
    agents: D<AgentT> = {};
    banksProdavec: D<BankProdavecT> = {};
    clientsRu: D<ClientRuT> = {};
    portsRu: D<PortRuT> = {};
    sortsAssortiment: D<SortAssortimentT> = {};
    productionSales: D<ProductionSalesT> = {};
    confidentialPhones: D<ConfidentialPhoneT> = {};
    orgForms: D<OrgFormT> = {};

    constructor() {
        makeAutoObservable(this);
    }

    setSp(data: any, key: string) {
        this[key] = data;
    }
}

const spsStore = new SpsStore();

export type SpsKeyT = keyof Omit<typeof spsStore, 'setSp'>;

export default spsStore;
