/* eslint-disable no-return-assign */
// sp - dictionary (spravochnik)
// data already selected on init
import { makeAutoObservable } from 'mobx';
import {
    ProductionsT,
    SellersT,
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
    SortsAssortimentT,
    TransportsT,
} from '../../types/typesSP';

class SpsStore {
    transports: TransportsT = {};
    vessels: VesselsT = {};
    production: ProductionsT = {};
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
    sortsAssortiment: SortsAssortimentT = {};

    constructor() {
        makeAutoObservable(this);
    }

    setSp = {
        vessels: (vessels: VesselsT) => (this.vessels = vessels),
        transports: (transports: TransportsT) => (this.transports = transports),
        production: (production: ProductionsT) => (this.production = production),
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
        sortsAssortiment: (sorts: SortsAssortimentT) => (this.sortsAssortiment = sorts),
    };
}

const spsStore = new SpsStore();
export default spsStore;
