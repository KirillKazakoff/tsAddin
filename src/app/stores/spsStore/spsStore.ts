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
} from '../../types/typesSP';

class SpsStore {
    transport = {
        name: '',
        nameEng: '',
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
}

const spsStore = new SpsStore();
export default spsStore;
