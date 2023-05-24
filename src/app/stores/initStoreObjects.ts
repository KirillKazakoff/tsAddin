import {
    PodpisantT,
    PortRuT,
    PortTamozhnyaT,
    PortZarubezhT,
    TransportT,
} from '../types/typesSP';

export const initTransport = (): TransportT => ({
    codeName: '',
    eng: { name: '' },
    ru: { name: '' },
    id: '',
});

export const initPortRu = (): PortRuT => ({
    codeName: '',
    director: '',
    mail: '',
    name: '',
    phone: '',
});

export const initPortTamozhnya = (): PortTamozhnyaT => ({
    codeName: '',
    eng: { name: '' },
    ru: { name: '' },
});

export const initPortZarubezh = (): PortZarubezhT => ({
    codeName: '',
    eng: {
        name: '',
        country: '',
    },
    ru: {
        name: '',
        country: '',
    },
});

export const initPodpisant = (): PodpisantT => ({
    codeName: '',
    ru: {
        name: '',
        comment: '',
    },
    eng: {
        name: '',
        comment: '',
    },
    declination: '',
});
