import {
    PodpisantT,
    PortRuT,
    PortTamozhnyaT,
    PortZarubezhT,
    TransportT,
} from '../types/typesSP';

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
        base: '',
        face: '',
        sex: '',
    },
});
