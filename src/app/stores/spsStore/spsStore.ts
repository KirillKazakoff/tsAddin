// sp - dictionary (spravochnik)
// data already selected on init
import { makeAutoObservable } from 'mobx';
import {
    ProductionNewT,
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
} from '../../types/typesSP';

class SpsStore {
    transport = {
        eng: { name: '' },
        ru: { name: '' },
        id: '',
    };
    vessels: VesselsT = {};
    production: ProductionNewT = {};
    sellers: SellersT = {};
    consignees: ConsigneesT = {};
    portsTamozhnya: PortsTamozhnyaT = {};
    portsZarubezh: PortsZarubezhT = {};
    contracts: ContractsT = {};
    podpisants: PodpisantsT = {};
    agents: AgentsT = {};
    banksProdavec: BanksProdavecT = {};
    clientsRu: ClientsRuT = {};

    constructor() {
        makeAutoObservable(this);
    }

    setVessels(vessels: VesselsT) {
        this.vessels = vessels;
    }

    setTransport(transport: TransportT) {
        this.transport = transport;
    }

    setProduction(production: ProductionNewT) {
        this.production = production;
    }

    setSellers(sellers: SellersT) {
        this.sellers = sellers;
    }

    setConsignees(consignees: ConsigneesT) {
        this.consignees = consignees;
    }

    setPortsTamozhnya(ports: PortsTamozhnyaT) {
        this.portsTamozhnya = ports;
    }

    setPortsZarubezh(ports: PortsZarubezhT) {
        this.portsZarubezh = ports;
    }

    setContracts(contracts: ContractsT) {
        this.contracts = contracts;
    }

    setPodpisants(podpisants: PodpisantsT) {
        this.podpisants = podpisants;
    }

    setAgents(agents: AgentsT) {
        this.agents = agents;
    }

    setBanksProdavec(banks: BanksProdavecT) {
        this.banksProdavec = banks;
    }

    setClientsRu(clients: ClientsRuT) {
        this.clientsRu = clients;
    }
}

const spsStore = new SpsStore();
export default spsStore;
