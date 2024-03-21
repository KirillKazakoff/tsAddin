import { ConfidentialPhoneT } from './spsStore/set/setConfidentialPhone';
import { PodpisantT } from './spsStore/set/setPodpisants';
import { PortRuT } from './spsStore/set/setPortsRu';
import { PortTamozhnyaT } from './spsStore/set/setPortsTamozhnya';
import { PortZarubezhT } from './spsStore/set/setPortsZarubezh';
import { TransportT } from './spsStore/set/setTransport';

export const initTransport = (): TransportT => ({
    code: '',
    eng: { name: '' },
    ru: { name: '', noSpec: '' },
    id: '',
});

export const initPortRu = (): PortRuT => ({
    code: '',
    director: '',
    mail: '',
    name: '',
    phone: '',
});

export const initPortTamozhnya = (): PortTamozhnyaT => ({
    code: '',
    eng: { name: '' },
    ru: { name: '' },
});

export const initPortZarubezh = (): PortZarubezhT => ({
    code: '',
    eng: {
        name: '',
        country: '',
        countryFull: '',
    },
    ru: {
        name: '',
        country: '',
        countryFull: '',
    },
});

export const initPodpisant = (): PodpisantT => ({
    code: '',
    ru: {
        name: '',
        comment: '',
        position: '',
    },
    eng: {
        name: '',
        comment: '',
    },
    declination: '',
    req: {
        base: {
            ТРК: '',
            МСИ: '',
        },
        face: '',
        sex: '',
    },
});

export const initExecutive = (): ConfidentialPhoneT => ({
    code: '',
    fullName: '',
    name: '',
    passport: '',
    passportInfo: '',
    phone: '',
});
