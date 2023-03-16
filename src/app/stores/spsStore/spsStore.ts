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
}

const spsStore = new SpsStore();
export default spsStore;
