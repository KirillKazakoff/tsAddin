/* eslint-disable no-return-assign */
// sp - dictionary (spravochnik)
// data already selected on init
import { makeAutoObservable } from 'mobx';
import {
    ProductionT,
    SellersT,
    TransportT,
    ConsigneesT,
    VesselsT,
    PortsTamozhnyaT,
    PortsZarubezhT,
    ContractsT,
    PodpisantsT,
    AgentsT,
    BanksProdavecT,
    ClientsRuT,
    PortsRuT,
    PackagesT,
} from '../../types/typesSP';
import { initTransport } from '../initStoreObjects';

class SpsStore {
    transport = initTransport();
    vessels: VesselsT = {};
    production: ProductionT = {};
    packages: PackagesT = {};
    sellers: SellersT = {};
    consignees: ConsigneesT = {};
    portsTamozhnya: PortsTamozhnyaT = {};
    portsZarubezh: PortsZarubezhT = {};
    contracts: ContractsT = {};
    podpisants: PodpisantsT = {};
    agents: AgentsT = {};
    banksProdavec: BanksProdavecT = {};
    clientsRu: ClientsRuT = {};
    portsRu: PortsRuT = {};

    constructor() {
        makeAutoObservable(this);
    }

    setSp = {
        vessels: (vessels: VesselsT) => (this.vessels = vessels),
        transport: (transport: TransportT) => (this.transport = transport),
        production: (production: ProductionT) => (this.production = production),
        packages: (packages: PackagesT) => (this.packages = packages),
        sellers: (sellers: SellersT) => (this.sellers = sellers),
        consignees: (consignees: ConsigneesT) => (this.consignees = consignees),
        portsTamozhnya: (ports: PortsTamozhnyaT) => (this.portsTamozhnya = ports),
        portsZarubezh: (ports: PortsZarubezhT) => (this.portsZarubezh = ports),
        contracts: (contracts: ContractsT) => (this.contracts = contracts),
        podpisants: (podpisants: PodpisantsT) => (this.podpisants = podpisants),
        agents: (agents: AgentsT) => (this.agents = agents),
        banksProdavec: (banks: BanksProdavecT) => (this.banksProdavec = banks),
        clientsRu: (clients: ClientsRuT) => (this.clientsRu = clients),
        portsRu: (portsRu: PortsRuT) => (this.portsRu = portsRu),
    };
}

const spsStore = new SpsStore();
export default spsStore;
